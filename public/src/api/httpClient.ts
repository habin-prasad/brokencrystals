import axios, { AxiosInstance } from 'axios';
import { makeApiRequest } from './makeApiRequest';
import { ApiUrl } from './ApiUrl';
import { Testimonial } from '../interfaces/Testimonial';
import { LoginUser, RegistrationUser } from '../interfaces/User';

export const httpClient: AxiosInstance = axios.create();

export function getTestimonials(): Promise<any> {
  return makeApiRequest({ url: ApiUrl.Testimonials, method: 'get' });
}

export function getTestimonialsCount(): Promise<any> {
  return makeApiRequest({
    url: `${ApiUrl.Testimonials}/count?query=${encodeURIComponent(
      'select count(1) as count from testimonial',
    )}`,
    method: 'get',
  });
}

export function postTestimonials(data: Testimonial): Promise<any> {
  return makeApiRequest({
    url: ApiUrl.Testimonials,
    method: 'post',
    data,
  });
}

export function postSubscriptions(email: string): Promise<any> {
  return makeApiRequest({
    url: `${ApiUrl.Subscriptions}?email=${email}`,
    method: 'post',
  });
}

export function postUser(data: RegistrationUser): Promise<any> {
  return makeApiRequest({
    url: ApiUrl.Users,
    method: 'post',
    data,
  });
}

export function getUser(data: LoginUser): Promise<any> {
  return makeApiRequest({
    url: ApiUrl.Auth,
    method: 'post',
    data,
  });
}

export function getLdap(ldapProfileLink: string): Promise<any> {
  return makeApiRequest({
    url: `${ApiUrl.Users}/ldap?query=${encodeURIComponent(ldapProfileLink)}`,
    method: 'get',
  });
}

export function postMetadata(): Promise<any> {
  return makeApiRequest({
    url: `${ApiUrl.Metadata}?xml=${encodeURIComponent(
      '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE child [ <!ENTITY child SYSTEM "file:///etc/passwd"> ]><child></child>',
    )}`,
    method: 'post',
    headers: { 'Content-Type': 'text/xml' },
  });
}

export function getPhoto(email: string): Promise<any> {
  return makeApiRequest({
    url: `${ApiUrl.Users}/one/${email}/photo`,
    method: 'get',
    responseType: 'blob',
  });
}

export function putPhoto(photo: File, email: string): Promise<any> {
  const data = new FormData();
  data.append(email, photo, photo.name);

  return makeApiRequest({
    url: `${ApiUrl.Users}/one/${email}/photo`,
    method: 'put',
    headers: { 'Content-Type': 'image/png' },
    data,
  });
}

export function goTo(url: string): Promise<any> {
  return makeApiRequest({
    url: `${ApiUrl.Goto}?url=${url}`,
    method: 'get',
  });
}