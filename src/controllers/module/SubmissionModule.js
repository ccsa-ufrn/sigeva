import Module from './Module';

/** @@ Submission Module
 * Subclass of Module, that represents the Submission Module
 *
 * @ Log:
 * Maradona Morais '2017-11-04 19:26' >> First definition of the class
 */

class SubmissionModule extends Module {
  /**
   * Initialize a Payment instance creating a empty Object
   */
  constructor(eventId_) {
    super(eventId_, 'Trabalhos', 'submission');
  }
}

export default SubmissionModule;
