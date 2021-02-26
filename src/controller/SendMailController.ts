import { getCustomRepository } from 'typeorm';
import {Request, Response} from 'express'
import UserRepository from '../repositories/UserRepository';
import { SurveyRepository } from '../repositories/SurveyRepository';
import SurveyUserReository from '../repositories/SurveyUserRepository';
import SendMailService from '../service/SendMailService';

export default class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body

    const userRepository = getCustomRepository(UserRepository)
    const surveyRepository = getCustomRepository(SurveyRepository)
    const surveyUserRepository = getCustomRepository(SurveyUserReository)

    const userAlredyExists = await userRepository.findOne({ email })

    if(!userAlredyExists) {
      return response.status(400).json({
        error: "user does not exists"
      })
    }

    const surveyAlreadyExists = await surveyRepository.findOne({ id: survey_id })

    if(!surveyAlreadyExists) {
      return response.status(400).json({
        error: "survey does not exists"
      })
    }

    const surveyUser = surveyUserRepository.create({
      user_id: userAlredyExists.id,
      survey_id,
    })

    await surveyUserRepository.save(surveyUser)

    await SendMailService.execute(email, surveyAlreadyExists.title, surveyAlreadyExists.description)

    return response.json(surveyUser)
  }
}
