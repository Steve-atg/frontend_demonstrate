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

export namespace Users {
  /**
   * No description
   * @tags users
   * @name UsersControllerCreate
   * @summary Create a new user
   * @request POST:/users
   * @secure
   */
  export namespace UsersControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = UserResponseDto;
  }

  /**
   * @description Get list of all users with comprehensive filtering, sorting, and pagination options. Only admin users (level 99) can access this endpoint.
   * @tags users
   * @name UsersControllerFindAll
   * @summary Get all users with optional filtering and pagination
   * @request GET:/users
   * @secure
   */
  export namespace UsersControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedUsersResponseDto;
  }

  /**
   * No description
   * @tags users
   * @name UsersControllerFindOne
   * @summary Get a user by ID
   * @request GET:/users/{id}
   * @secure
   */
  export namespace UsersControllerFindOne {
    export type RequestParams = {
      /** User ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserResponseDto;
  }

  /**
   * No description
   * @tags users
   * @name UsersControllerGetMyProfile
   * @summary Get current user profile
   * @request GET:/users/me/profile
   * @secure
   */
  export namespace UsersControllerGetMyProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserResponseDto;
  }

  /**
   * No description
   * @tags users
   * @name UsersControllerRemove
   * @summary Delete a user
   * @request DELETE:/users/{id}
   * @secure
   */
  export namespace UsersControllerRemove {
    export type RequestParams = {
      /** User ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags users
   * @name UsersControllerUpdate
   * @summary Update a user
   * @request PATCH:/users/{id}
   * @secure
   */
  export namespace UsersControllerUpdate {
    export type RequestParams = {
      /** User ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = UserResponseDto;
  }

  /**
   * No description
   * @tags users
   * @name UsersControllerUpdateMyProfile
   * @summary Update current user profile
   * @request PATCH:/users/me/profile
   * @secure
   */
  export namespace UsersControllerUpdateMyProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = UserResponseDto;
  }

  /**
   * @description Upgrade a user to a higher level. Only admin users (level 99) can perform this action.
   * @tags users
   * @name UsersControllerUpgradeUser
   * @summary Upgrade user level
   * @request PATCH:/users/{id}/upgrade
   * @secure
   */
  export namespace UsersControllerUpgradeUser {
    export type RequestParams = {
      /** User ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpgradeUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = UserResponseDto;
  }
}
