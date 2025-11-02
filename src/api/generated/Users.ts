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
  PaginatedUsersResponseDto,
  UpdateUserDto,
  UpgradeUserDto,
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
   * @description Get list of all users with comprehensive filtering, sorting, and pagination options. Only admin users (level 99) can access this endpoint.
   *
   * @tags users
   * @name UsersControllerFindAll
   * @summary Get all users with optional filtering and pagination
   * @request GET:/users
   * @secure
   */
  usersControllerFindAll = (
    query?: {
      /**
       * Filter users born after this date
       * @format date-time
       * @example "1990-01-01T00:00:00.000Z"
       */
      bornAfter?: string;
      /**
       * Filter users born before this date
       * @format date-time
       * @example "2000-12-31T00:00:00.000Z"
       */
      bornBefore?: string;
      /**
       * Filter users created after this date
       * @format date-time
       * @example "2023-01-01T00:00:00.000Z"
       */
      createdAfter?: string;
      /**
       * Filter users created before this date
       * @format date-time
       * @example "2023-12-31T23:59:59.999Z"
       */
      createdBefore?: string;
      /**
       * Filter by email (partial match)
       * @example "john@example.com"
       */
      email?: string;
      /**
       * Filter by gender
       * @example "M"
       */
      gender?: "M" | "F" | "OTHER";
      /**
       * Number of items per page
       * @min 1
       * @max 100
       * @default 10
       * @example 10
       */
      limit?: number;
      /**
       * Filter by maximum user level
       * @min 1
       * @example 10
       */
      maxUserLevel?: number;
      /**
       * Filter by minimum user level
       * @min 1
       * @example 1
       */
      minUserLevel?: number;
      /**
       * Page number for pagination
       * @min 1
       * @default 1
       * @example 1
       */
      page?: number;
      /**
       * Global search term (searches in username and email)
       * @example "john"
       */
      search?: string;
      /**
       * Field to sort by
       * @default "username"
       * @example "username"
       */
      sortBy?: "username" | "email" | "userLevel" | "createdAt" | "updatedAt";
      /**
       * Sort order
       * @default "desc"
       * @example "desc"
       */
      sortOrder?: "asc" | "desc";
      /**
       * Filter by exact user level
       * @min 1
       * @example 5
       */
      userLevel?: number;
      /**
       * Filter by username (partial match)
       * @example "john"
       */
      username?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PaginatedUsersResponseDto, void>({
      path: `/users`,
      method: "GET",
      query: query,
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
   * @summary Get current user profile
   * @request GET:/users/me/profile
   * @secure
   */
  usersControllerGetMyProfile = (params: RequestParams = {}) =>
    this.request<UserResponseDto, void>({
      path: `/users/me/profile`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersControllerRemove
   * @summary Delete a user
   * @request DELETE:/users/{id}
   * @secure
   */
  usersControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
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
   * @summary Update a user
   * @request PATCH:/users/{id}
   * @secure
   */
  usersControllerUpdate = (
    id: string,
    data: UpdateUserDto,
    params: RequestParams = {},
  ) =>
    this.request<UserResponseDto, void>({
      path: `/users/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersControllerUpdateMyProfile
   * @summary Update current user profile
   * @request PATCH:/users/me/profile
   * @secure
   */
  usersControllerUpdateMyProfile = (
    data: UpdateUserDto,
    params: RequestParams = {},
  ) =>
    this.request<UserResponseDto, void>({
      path: `/users/me/profile`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Upgrade a user to a higher level. Only admin users (level 99) can perform this action.
   *
   * @tags users
   * @name UsersControllerUpgradeUser
   * @summary Upgrade user level
   * @request PATCH:/users/{id}/upgrade
   * @secure
   */
  usersControllerUpgradeUser = (
    id: string,
    data: UpgradeUserDto,
    params: RequestParams = {},
  ) =>
    this.request<UserResponseDto, void>({
      path: `/users/${id}/upgrade`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
