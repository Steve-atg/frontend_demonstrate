/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags users
   * @name UsersControllerCreate
   * @summary Create a new user
   * @request POST:/users
   * @secure
   */
  usersControllerCreate = (data: CreateUserDto, params: RequestParams = {}) =>
    this.request<UserResponseDto, void>({
      path: `/users`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get list of all users. Only admin users (level 99) can access this endpoint.
   *
   * @tags users
   * @name UsersControllerFindAll
   * @summary Get all users with optional filtering and pagination
   * @request GET:/users
   * @secure
   */
  usersControllerFindAll = (params: RequestParams = {}) =>
    this.request<UserResponseDto[], void>({
      path: `/users`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersControllerFindOne
   * @summary Get a user by ID
   * @request GET:/users/{id}
   * @secure
   */
  usersControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<UserResponseDto, void>({
      path: `/users/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersControllerGetMyProfile
   * @request GET:/users/me/profile
   * @secure
   */
  usersControllerGetMyProfile = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/users/me/profile`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersControllerRemove
   * @request DELETE:/users/{id}
   * @secure
   */
  usersControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/users/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersControllerUpdate
   * @request PATCH:/users/{id}
   * @secure
   */
  usersControllerUpdate = (
    id: string,
    data: UpdateUserDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/users/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersControllerUpdateMyProfile
   * @request PATCH:/users/me/profile
   * @secure
   */
  usersControllerUpdateMyProfile = (
    data: UpdateUserDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/users/me/profile`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
