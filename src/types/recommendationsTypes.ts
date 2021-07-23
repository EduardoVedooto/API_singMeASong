export interface IBody {
  name: string,
  youtubeLink: string
}

export interface IRecommendation extends IBody {
  id: number,
  score: number
}