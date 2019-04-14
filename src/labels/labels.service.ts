import { Injectable } from '@nestjs/common'
import { RecordInvalidException } from '../exception'
import { Label } from './label.entity'
import { User } from '../users/user.entity'

@Injectable()
export class LabelsService {
  constructor() {}

  async findByUser(user: User): Promise<Label[]> {
    return await Label.find({ user: user })
  }

  async findById(id: number): Promise<Label | undefined> {
    return await Label.findOne(id)
  }

  async create(label: Label): Promise<Label> {
    await Label.insert(label).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return label
  }

  async update(label: Label): Promise<Label> {
    await Label.update(
      { id: label.id, user: label.user },
      label
    ).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return label
  }

  delete(label: Label): void {
    Label
      .delete({ id: label.id, user: label.user })
      .catch(e => {
        console.log(e)
        throw new RecordInvalidException(e.detail)
      })
  }
}
