import { Router } from "express";
import JWT from "jsonwebtoken";
import NodeMailer from "nodemailer";

import Response from "../Response";
import { simpleAuthorization } from "../authorization/Authorization";
import { secret, email } from "../../../config";

import User from "./User";

/**
 * User Router
 * Defines API's routers to interact with users
 */

const userRouter = Router();

/**
 * Create a new user
 * @param fields representing a user
 * @return Created user object
 */
userRouter.post("/", (req, res) => {
  const user = new User();
  user
    .setData(req.body)
    .then(() => {
      user
        .store()
        .then((data) => {
          res.json(Response(false, data));
        })
        .catch((err) => {
          res.json(Response(true, {}, err));
        });
    })
    .catch((data) => {
      if (data.error_type === "system") {
        res.status(500).json(Response(true, {}, data.message));
      } else {
        res
          .status(400)
          .json(Response(true, data.errors, "Erro ao fazer cadastro"));
      }
    });
});

/**
 * Update user data
 * @param
 */
userRouter.put("/", simpleAuthorization, (req, res) => {
  const user = new User();

  user.loadById(res.locals.user._id).then(() => {
    user.updateData(req.body).then(() => {
      res.json(Response(false, {}));
    });
  });
});

/**
 * Authorizes a user generating a access token
 * @param email user email passed by post body
 * @param password user password passed by post body
 */
userRouter.post("/authorize", (req, res) => {
  const email = req.body.email; // user passed email
  const password = req.body.password; // user passed password

  const user = new User();
  user
    .authorize(email, password)
    .then((authorized) => {
      if (authorized) {
        // User was authorized
        const tokenData = {
          _id: user.userObject._id,
          ofTypes: user.userObject.ofTypes,
        };
        // Creates a JWT to grant user access
        const token = JWT.sign(tokenData, secret, {
          expiresIn: "24h", // The token expires in 24 hours
        });
        res
          .cookie("sigeva_user_token", token)
          .json(Response(false, { authorized, token }));
      } else {
        // Passed password is incorrect
        res.json(Response(true, {}, "Senha incorreta"));
      }
    })
    .catch((err) => {
      // The user with passed email doesn't exists
      res.json(Response(true, {}, "Não existe usuário com este email"));
    });
});

/**
 * Return the formated current logged user
 * @return User Object
 */
userRouter.get("/me", simpleAuthorization, (req, res) => {
  const user = new User();
  user
    .loadById(res.locals.user._id) // Load from id validated by simpleAuthorization
    .then(() => {
      // The user exists
      user
        .toFormatedUser("cpf institution phone special-needs")
        .then((formatedUser) => {
          res.json(Response(false, formatedUser));
        })
        .catch((e) => {
          res.json(
            Response(true, {
              err: e.toString(),
            })
          );
        });
    });
});

/**
 * Close the user session of the current logged user
 */
userRouter.get("/logout", simpleAuthorization, (req, res) => {
  try {
    res.clearCookie("sigeva_user_token").json(Response(false, {}));
  } catch (e) {
    res.json(
      Response(true, {}, "Erro desconhecido ao fechar sessão de usuário")
    );
  }
});

/**
 * Generate a code to recover password
 */
userRouter.post("/recover-password", (req, res) => {
  const user = new User();
  const userEmail = req.body.email;

  user
    .loadByEmail(userEmail)
    .then(() => {
      user
        .generateRecoverPasswordCode()
        .then((generatedCode) => {
          // send mail here
          const transporter = NodeMailer.createTransport({
            service: "gmail",
            auth: {
              user: email.user,
              pass: email.password,
            },
          });
          const mailOptions = {
            from: email.user,
            to: userEmail,
            subject: "[Sigeva] Recuperação de Senha",
            html: `<h4>Solicitação de nova senha</h4>
            <p>Foi solicitada a criação de uma nova senha para a conta com este e-mail na plataforma
            Sigeva
            </p>
            <p>Código de recuperação: ${generatedCode}</p>
            <center><a href="http://sigeva.ccsa.ufrn.br/new-password/${user.userObject._id}/${generatedCode}" target="_blank">Criar nova senha</a></center>
            `,
          };
          transporter.sendMail(mailOptions, (err) => {
            if (err) { console.log(err)};
            res.json(Response(false, {}));
          });
        })
        .catch(() => {
          res.json(Response(true, {}));
        });
    })
    .catch(() => {
      res.json(Response(true, {}, "Usuário não encontrado"));
    });
});

/**
 * Set new password
 */
userRouter.post("/new-password", (req, res) => {
  const user = new User();
  const password = req.body.newPassword;
  const userId = req.body.userId;
  const code = req.body.code;

  user
    .loadById(userId)
    .then(() => {
      if (user.userObject.passwordCode) {
        if (user.userObject.passwordCode === code) {
          user
            .newPassword(password)
            .then(() => {
              res.json(Response(false, {}));
            })
            .catch(() => {
              res.json(Response(true, {}));
            });
        }
      }
    })
    .catch(() => {
      res.json(Response(true, {}, "Usuário não encontrado"));
    });
});

/**
 * Get user by ID
 * @param field user fields to be returned in request
 * @return User Object
 */
userRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const fields = req.query.f ? req.query.f : "_id"; /* return id by default */

  const user = new User(); // Create a user instance
  user
    .loadById(id) // Load the user by the passed ID
    .then(() => {
      // there is a user with that ID
      user
        .toFormatedUser(fields) // Format it
        .then((formatedUser) => {
          res.json(Response(false, formatedUser));
        })
        .catch(() => {
          res.json(Response(true, {}, "Erro ao formatar usuário"));
        });
    })
    .catch(() => {
      // there is not a user with that ID, display error message
      res.json(Response(true, {}, "Usuário não encontrado"));
    });
});

export default userRouter;
