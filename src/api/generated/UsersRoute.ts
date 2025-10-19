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
   * @description Get list of all users. Only admin users (level 99) can access this endpoint.
   * @tags users
   * @name UsersControllerFindAll
   * @summary Get all users with optional filtering and pagination
   * @request GET:/users
   * @secure
   */
  export namespace UsersControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserResponseDto[];
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
   * @request GET:/users/me/profile
   * @secure
   */
  export namespace UsersControllerGetMyProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags users
   * @name UsersControllerRemove
   * @request DELETE:/users/{id}
   * @secure
   */
  export namespace UsersControllerRemove {
    export type RequestParams = {
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
   * @request PATCH:/users/{id}
   * @secure
   */
  export namespace UsersControllerUpdate {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags users
   * @name UsersControllerUpdateMyProfile
   * @request PATCH:/users/me/profile
   * @secure
   */
  export namespace UsersControllerUpdateMyProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}
