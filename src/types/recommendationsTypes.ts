export interface IBody {
  name: string,
  genresIds: number[],
  youtubeLink: string
}

export interface IRecommendation extends IBody {
  id: number,
  score: number
}