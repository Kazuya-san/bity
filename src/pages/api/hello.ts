// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}


interface Person{
  name: string,
  age: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Person>
) {
  res.status(200).json({ name: 'John Doe' })
}
