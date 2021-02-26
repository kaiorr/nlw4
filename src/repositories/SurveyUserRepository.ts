import { EntityRepository, Repository } from 'typeorm';
import SurveyUser from '../models/SurveyUser';

@EntityRepository(SurveyUser)
export default class SurveyUserReository extends Repository<SurveyUser> {

}
