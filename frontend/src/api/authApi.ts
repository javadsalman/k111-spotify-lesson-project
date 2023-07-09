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

export function loginArtist(username: string, password: string) {
   return iaxios.post<IAuthData<"artist">>("/auth/artist-login/", {
      username,
      password,
   });
}

export function loginCustomer(username: string, password: string) {
   return iaxios.post<IAuthData<"customer">>("/auth/customer-login/", {
      username,
      password,
   });
}

export interface IArtistRegisterParams {
   first_name: string;
   last_name: string;
   username: string;
   password: string;
   email: string;
   birth_date: string;
   gender: string;
   image: File;
}
export function registerArtist(data: IArtistRegisterParams) {
   const formData = new FormData();
   for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
   }
   return iaxios.post<IAuthData<"artist">>("/auth/artist-register/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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
export function registerCustomer(data: ICustomerRegisterParams) {
   const formData = new FormData();
   for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
   }
   return iaxios.post<IAuthData<"customer">>("/auth/customer-register/", formData, {
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
   data: IUserInformationParams
) {
   return iaxios.patch<IUserInformationResponse>(`/auth/artists/auth/`, data);
}

export function changeCustomerInformations(
   data: IUserInformationParams
) {
   return iaxios.patch<IUserInformationResponse>(`/auth/customers/auth/`, data);
}

export function getArtistAuthInfo() {
   return iaxios.get<IUserInformationResponse>(`/auth/artists/auth/`);
}

export function getCustomerAuthInfo() {
   return iaxios.get<IUserInformationResponse>(`/auth/customers/auth/`);
}

export function changeArtistPassword(password: string) {
   return iaxios.patch<IUserInformationResponse>(`/auth/artists/auth/`, {password});
}

export function changeCustomerPassword(password: string) {
   return iaxios.patch<IUserInformationResponse>(`/auth/customers/auth/`, {password});
}


export function changeArtistImage(image: File) {
   const formData = new FormData()
   formData.append('image', image)
   return iaxios.patch<IUserInformationResponse>(`/auth/artists/auth/`, formData, {
      headers: {
         'Content-Type': 'multipart/formdata'
      }
   });
}

export function changeCustomerImage(image: File) {
   const formData = new FormData()
   formData.append('image', image)
   return iaxios.patch<IUserInformationResponse>(`/auth/customers/auth/`, formData, {
      headers: {
         'Content-Type': 'multipart/formdata'
      }
   });
}

