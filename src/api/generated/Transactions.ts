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
  CreateTransactionDto,
  TransactionResponseDto,
  UpdateTransactionDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Transactions<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags transactions
   * @name TransactionsControllerCreate
   * @summary Create a new transaction
   * @request POST:/transactions
   * @secure
   */
  transactionsControllerCreate = (
    data: CreateTransactionDto,
    params: RequestParams = {},
  ) =>
    this.request<TransactionResponseDto, void>({
      path: `/transactions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags transactions
   * @name TransactionsControllerCreateMyTransaction
   * @request POST:/transactions/me/transactions
   * @secure
   */
  transactionsControllerCreateMyTransaction = (
    data: CreateTransactionDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/transactions/me/transactions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags transactions
   * @name TransactionsControllerFindAll
   * @request GET:/transactions
   * @secure
   */
  transactionsControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/transactions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags transactions
   * @name TransactionsControllerFindOne
   * @request GET:/transactions/{id}
   * @secure
   */
  transactionsControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/transactions/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags transactions
   * @name TransactionsControllerGetMyTransactions
   * @request GET:/transactions/me/transactions
   * @secure
   */
  transactionsControllerGetMyTransactions = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/transactions/me/transactions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags transactions
   * @name TransactionsControllerRemove
   * @request DELETE:/transactions/{id}
   * @secure
   */
  transactionsControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/transactions/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags transactions
   * @name TransactionsControllerUpdate
   * @request PATCH:/transactions/{id}
   * @secure
   */
  transactionsControllerUpdate = (
    id: string,
    data: UpdateTransactionDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/transactions/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
