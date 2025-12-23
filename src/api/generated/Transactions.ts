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
  PaginatedTransactionsResponseDto,
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
   * @name TransactionsControllerFindAll
   * @summary Get all transactions with filtering and pagination
   * @request GET:/transactions
   * @secure
   */
  transactionsControllerFindAll = (
    query?: {
      /**
       * Filter by category IDs
       * @example ["123e4567-e89b-12d3-a456-426614174001"]
       */
      categoryIds?: string[];
      /**
       * Filter by creation date (after)
       * @example "2024-01-01T00:00:00.000Z"
       */
      createdAfter?: string;
      /**
       * Filter by creation date (before)
       * @example "2024-12-31T23:59:59.999Z"
       */
      createdBefore?: string;
      /**
       * Filter by currency code
       * @example "HKD"
       */
      currency?: string;
      /**
       * Filter by exact description match
       * @example "Grocery shopping"
       */
      description?: string;
      /**
       * Number of items per page
       * @min 1
       * @max 100
       * @default 10
       * @example 10
       */
      limit?: number;
      /**
       * Maximum transaction amount
       * @min 0
       * @example 1000
       */
      maxAmount?: number;
      /**
       * Minimum transaction amount
       * @min 0
       * @example 10
       */
      minAmount?: number;
      /**
       * Page number for pagination
       * @min 1
       * @default 1
       * @example 1
       */
      page?: number;
      /**
       * Search term for description (partial match)
       * @example "grocery"
       */
      search?: string;
      /**
       * Field to sort by
       * @default "transactionDate"
       * @example "transactionDate"
       */
      sortBy?: string;
      /**
       * Sort order (ascending or descending)
       * @default "desc"
       * @example "desc"
       */
      sortOrder?: string;
      /**
       * Filter transactions after this date
       * @example "2024-01-01T00:00:00.000Z"
       */
      transactionDateAfter?: string;
      /**
       * Filter transactions before this date
       * @example "2024-12-31T23:59:59.999Z"
       */
      transactionDateBefore?: string;
      /**
       * Filter by transaction type
       * @example "SPEND"
       */
      type?: string;
      /**
       * Filter by user ID
       * @example "123e4567-e89b-12d3-a456-426614174000"
       */
      userId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PaginatedTransactionsResponseDto, void>({
      path: `/transactions`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags transactions
   * @name TransactionsControllerFindOne
   * @summary Get a transaction by ID
   * @request GET:/transactions/{id}
   * @secure
   */
  transactionsControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<TransactionResponseDto, void>({
      path: `/transactions/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags transactions
   * @name TransactionsControllerGetMyTransactions
   * @summary Get current user transactions with filtering and pagination
   * @request GET:/transactions/me
   * @secure
   */
  transactionsControllerGetMyTransactions = (
    query?: {
      /**
       * Filter by category IDs
       * @example ["123e4567-e89b-12d3-a456-426614174001"]
       */
      categoryIds?: string[];
      /**
       * Filter by creation date (after)
       * @example "2024-01-01T00:00:00.000Z"
       */
      createdAfter?: string;
      /**
       * Filter by creation date (before)
       * @example "2024-12-31T23:59:59.999Z"
       */
      createdBefore?: string;
      /**
       * Filter by currency code
       * @example "HKD"
       */
      currency?: string;
      /**
       * Filter by exact description match
       * @example "Grocery shopping"
       */
      description?: string;
      /**
       * Number of items per page
       * @min 1
       * @max 100
       * @default 10
       * @example 10
       */
      limit?: number;
      /**
       * Maximum transaction amount
       * @min 0
       * @example 1000
       */
      maxAmount?: number;
      /**
       * Minimum transaction amount
       * @min 0
       * @example 10
       */
      minAmount?: number;
      /**
       * Page number for pagination
       * @min 1
       * @default 1
       * @example 1
       */
      page?: number;
      /**
       * Search term for description (partial match)
       * @example "grocery"
       */
      search?: string;
      /**
       * Field to sort by
       * @default "transactionDate"
       * @example "transactionDate"
       */
      sortBy?: string;
      /**
       * Sort order (ascending or descending)
       * @default "desc"
       * @example "desc"
       */
      sortOrder?: string;
      /**
       * Filter transactions after this date
       * @example "2024-01-01T00:00:00.000Z"
       */
      transactionDateAfter?: string;
      /**
       * Filter transactions before this date
       * @example "2024-12-31T23:59:59.999Z"
       */
      transactionDateBefore?: string;
      /**
       * Filter by transaction type
       * @example "SPEND"
       */
      type?: string;
      /**
       * Filter by user ID
       * @example "123e4567-e89b-12d3-a456-426614174000"
       */
      userId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PaginatedTransactionsResponseDto, void>({
      path: `/transactions/me`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags transactions
   * @name TransactionsControllerRemove
   * @summary Delete a transaction
   * @request DELETE:/transactions/{id}
   * @secure
   */
  transactionsControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
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
   * @summary Update a transaction
   * @request PATCH:/transactions/{id}
   * @secure
   */
  transactionsControllerUpdate = (
    id: string,
    data: UpdateTransactionDto,
    params: RequestParams = {},
  ) =>
    this.request<TransactionResponseDto, void>({
      path: `/transactions/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
