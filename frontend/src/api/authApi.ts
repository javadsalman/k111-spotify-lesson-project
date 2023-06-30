import { IArtist } from "../types";
import iaxios from "./iaxios";

interface IAuthData<T extends "customer" | "artist"> {
   id: number;
   token: string;
   user_type: T;
   username: string;
   first_name: string;
   last_name: string;
   email: string;
   image: string;
}

export function loginCustomer(username: string, password: string) {
   return iaxios.post<IAuthData<"customer">>("/auth/customer-login/", {
      username,
      password,
   });
}

export function loginArtist(username: string, password: string) {
   return iaxios.post<IAuthData<"artist">>("/auth/artist-login/", {
      username,
      password,
   });
}

export interface ICustomerRegisterParams {
   first_name: string;
   last_name: string;
   username: string;
   password: string;
   email: string;
   birth_date: string;
   gender: string;
   image: File;
}
export function registerArtist(data: ICustomerRegisterParams) {
   const formData = new FormData();
   for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
   }
   return iaxios.post<IAuthData<"artist">>("/auth/artist-register/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
   });
}

export function logout() {
   return iaxios.post("/auth/logout/");
}

export function searchArtists(keyword: string) {
   return iaxios.get<IArtist[]>(`/auth/artists/?search=${keyword}`);
}

interface IUserInformationResponse {
   birth_date: string
   email: string
   first_name: string
   id: number
   image: string
   last_name: string
   token: string
   user_type: string
   username: string
}

interface IUserInformationParams {
   first_name: string;
   last_name: string;
   username: string;
   email: string;
   birth_date: string;
}

export function changeArtistInformations(
   id: number,
   data: IUserInformationParams
) {
   return iaxios.patch<IUserInformationResponse>(`/auth/artists/${id}/auth/`, data);
}

export function getArtistAuthInfo(id: number) {
   return iaxios.get<IUserInformationResponse>(`/auth/artists/${id}/auth/`);
}

export function changeArtistPassword(id: number, password: string) {
   return iaxios.patch<IUserInformationResponse>(`/auth/artists/${id}/auth/`, {password});
}

export function changeArtistImage(id: number, image: File) {
   const formData = new FormData()
   formData.append('image', image)
   return iaxios.patch<IUserInformationResponse>(`/auth/artists/${id}/auth/`, formData, {
      headers: {
         'Content-Type': 'multipart/formdata'
      }
   });
}