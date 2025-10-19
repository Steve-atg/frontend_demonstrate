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
  AuthResponseDto,
  LoginDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
  RegisterDto,
} from "./data-contracts";

export namespace Auth {
  /**
   * No description
   * @tags auth
   * @name AuthControllerGetCurrentUser
   * @summary Get current user information
   * @request GET:/auth/me
   * @secure
   */
  export namespace AuthControllerGetCurrentUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerGetProfile
   * @summary Get current user profile
   * @request GET:/auth/profile
   * @secure
   */
  export namespace AuthControllerGetProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerLogin
   * @summary Login user
   * @request POST:/auth/login
   */
  export namespace AuthControllerLogin {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginDto;
    export type RequestHeaders = {};
    export type ResponseBody = AuthResponseDto;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerLogout
   * @summary Logout user and revoke refresh token
   * @request POST:/auth/logout
   * @secure
   */
  export namespace AuthControllerLogout {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefreshTokenDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerRefreshTokens
   * @summary Refresh access token using refresh token
   * @request POST:/auth/refresh
   */
  export namespace AuthControllerRefreshTokens {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefreshTokenDto;
    export type RequestHeaders = {};
    export type ResponseBody = RefreshTokenResponseDto;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerRegister
   * @summary Register a new user
   * @request POST:/auth/register
   */
  export namespace AuthControllerRegister {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RegisterDto;
    export type RequestHeaders = {};
    export type ResponseBody = AuthResponseDto;
  }
}
