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
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerGetCurrentUser
   * @summary Get current user information
   * @request GET:/auth/me
   * @secure
   */
  authControllerGetCurrentUser = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/me`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerGetProfile
   * @summary Get current user profile
   * @request GET:/auth/profile
   * @secure
   */
  authControllerGetProfile = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/profile`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerLogin
   * @summary Login user
   * @request POST:/auth/login
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.request<AuthResponseDto, void>({
      path: `/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerLogout
   * @summary Logout user and revoke refresh token
   * @request POST:/auth/logout
   * @secure
   */
  authControllerLogout = (data?: RefreshTokenDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/logout`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerRefreshTokens
   * @summary Refresh access token using refresh token
   * @request POST:/auth/refresh
   */
  authControllerRefreshTokens = (
    data: RefreshTokenDto,
    params: RequestParams = {},
  ) =>
    this.request<RefreshTokenResponseDto, void>({
      path: `/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerRegister
   * @summary Register a new user
   * @request POST:/auth/register
   */
  authControllerRegister = (data: RegisterDto, params: RequestParams = {}) =>
    this.request<AuthResponseDto, void>({
      path: `/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
