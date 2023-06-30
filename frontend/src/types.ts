export interface IGenre {
   id: number;
   title: string;
}

export interface IArtist {
   id: number;
   first_name: string;
   last_name: string;
   username: string;
   image: string;
}

export interface ISongSummary {
   id: number;
   title: string;
   image: string;
}

export interface ISong {
   artists_info: IArtist[];
   description: string;
   duration: number;
   file: string;
   genre_info: IGenre;
   id: number;
   image: string;
   like_count: number;
   title: string;
}
