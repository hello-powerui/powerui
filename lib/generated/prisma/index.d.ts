
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ColorPalette
 * 
 */
export type ColorPalette = $Result.DefaultSelection<Prisma.$ColorPalettePayload>
/**
 * Model GeneratedTheme
 * 
 */
export type GeneratedTheme = $Result.DefaultSelection<Prisma.$GeneratedThemePayload>
/**
 * Model NeutralPalette
 * 
 */
export type NeutralPalette = $Result.DefaultSelection<Prisma.$NeutralPalettePayload>
/**
 * Model Theme
 * 
 */
export type Theme = $Result.DefaultSelection<Prisma.$ThemePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model OrganizationMember
 * 
 */
export type OrganizationMember = $Result.DefaultSelection<Prisma.$OrganizationMemberPayload>
/**
 * Model Purchase
 * 
 */
export type Purchase = $Result.DefaultSelection<Prisma.$PurchasePayload>
/**
 * Model ThemeShare
 * 
 */
export type ThemeShare = $Result.DefaultSelection<Prisma.$ThemeSharePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserPlan: {
  PRO: 'PRO',
  TEAM: 'TEAM'
};

export type UserPlan = (typeof UserPlan)[keyof typeof UserPlan]


export const PurchasePlan: {
  PRO: 'PRO',
  TEAM_5: 'TEAM_5',
  TEAM_10: 'TEAM_10'
};

export type PurchasePlan = (typeof PurchasePlan)[keyof typeof PurchasePlan]


export const OrganizationRole: {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
};

export type OrganizationRole = (typeof OrganizationRole)[keyof typeof OrganizationRole]


export const PurchaseStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PurchaseStatus = (typeof PurchaseStatus)[keyof typeof PurchaseStatus]


export const ThemeVisibility: {
  PRIVATE: 'PRIVATE',
  ORGANIZATION: 'ORGANIZATION',
  PUBLIC: 'PUBLIC'
};

export type ThemeVisibility = (typeof ThemeVisibility)[keyof typeof ThemeVisibility]

}

export type UserPlan = $Enums.UserPlan

export const UserPlan: typeof $Enums.UserPlan

export type PurchasePlan = $Enums.PurchasePlan

export const PurchasePlan: typeof $Enums.PurchasePlan

export type OrganizationRole = $Enums.OrganizationRole

export const OrganizationRole: typeof $Enums.OrganizationRole

export type PurchaseStatus = $Enums.PurchaseStatus

export const PurchaseStatus: typeof $Enums.PurchaseStatus

export type ThemeVisibility = $Enums.ThemeVisibility

export const ThemeVisibility: typeof $Enums.ThemeVisibility

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ColorPalettes
 * const colorPalettes = await prisma.colorPalette.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ColorPalettes
   * const colorPalettes = await prisma.colorPalette.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.colorPalette`: Exposes CRUD operations for the **ColorPalette** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ColorPalettes
    * const colorPalettes = await prisma.colorPalette.findMany()
    * ```
    */
  get colorPalette(): Prisma.ColorPaletteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.generatedTheme`: Exposes CRUD operations for the **GeneratedTheme** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeneratedThemes
    * const generatedThemes = await prisma.generatedTheme.findMany()
    * ```
    */
  get generatedTheme(): Prisma.GeneratedThemeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.neutralPalette`: Exposes CRUD operations for the **NeutralPalette** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NeutralPalettes
    * const neutralPalettes = await prisma.neutralPalette.findMany()
    * ```
    */
  get neutralPalette(): Prisma.NeutralPaletteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.theme`: Exposes CRUD operations for the **Theme** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Themes
    * const themes = await prisma.theme.findMany()
    * ```
    */
  get theme(): Prisma.ThemeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizationMember`: Exposes CRUD operations for the **OrganizationMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationMembers
    * const organizationMembers = await prisma.organizationMember.findMany()
    * ```
    */
  get organizationMember(): Prisma.OrganizationMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.purchase`: Exposes CRUD operations for the **Purchase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Purchases
    * const purchases = await prisma.purchase.findMany()
    * ```
    */
  get purchase(): Prisma.PurchaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.themeShare`: Exposes CRUD operations for the **ThemeShare** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ThemeShares
    * const themeShares = await prisma.themeShare.findMany()
    * ```
    */
  get themeShare(): Prisma.ThemeShareDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ColorPalette: 'ColorPalette',
    GeneratedTheme: 'GeneratedTheme',
    NeutralPalette: 'NeutralPalette',
    Theme: 'Theme',
    User: 'User',
    Organization: 'Organization',
    OrganizationMember: 'OrganizationMember',
    Purchase: 'Purchase',
    ThemeShare: 'ThemeShare'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "colorPalette" | "generatedTheme" | "neutralPalette" | "theme" | "user" | "organization" | "organizationMember" | "purchase" | "themeShare"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ColorPalette: {
        payload: Prisma.$ColorPalettePayload<ExtArgs>
        fields: Prisma.ColorPaletteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColorPaletteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColorPaletteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload>
          }
          findFirst: {
            args: Prisma.ColorPaletteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColorPaletteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload>
          }
          findMany: {
            args: Prisma.ColorPaletteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload>[]
          }
          create: {
            args: Prisma.ColorPaletteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload>
          }
          createMany: {
            args: Prisma.ColorPaletteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColorPaletteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload>[]
          }
          delete: {
            args: Prisma.ColorPaletteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload>
          }
          update: {
            args: Prisma.ColorPaletteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload>
          }
          deleteMany: {
            args: Prisma.ColorPaletteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColorPaletteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ColorPaletteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload>[]
          }
          upsert: {
            args: Prisma.ColorPaletteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPalettePayload>
          }
          aggregate: {
            args: Prisma.ColorPaletteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColorPalette>
          }
          groupBy: {
            args: Prisma.ColorPaletteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColorPaletteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColorPaletteCountArgs<ExtArgs>
            result: $Utils.Optional<ColorPaletteCountAggregateOutputType> | number
          }
        }
      }
      GeneratedTheme: {
        payload: Prisma.$GeneratedThemePayload<ExtArgs>
        fields: Prisma.GeneratedThemeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeneratedThemeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeneratedThemeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload>
          }
          findFirst: {
            args: Prisma.GeneratedThemeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeneratedThemeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload>
          }
          findMany: {
            args: Prisma.GeneratedThemeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload>[]
          }
          create: {
            args: Prisma.GeneratedThemeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload>
          }
          createMany: {
            args: Prisma.GeneratedThemeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GeneratedThemeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload>[]
          }
          delete: {
            args: Prisma.GeneratedThemeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload>
          }
          update: {
            args: Prisma.GeneratedThemeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload>
          }
          deleteMany: {
            args: Prisma.GeneratedThemeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeneratedThemeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GeneratedThemeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload>[]
          }
          upsert: {
            args: Prisma.GeneratedThemeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneratedThemePayload>
          }
          aggregate: {
            args: Prisma.GeneratedThemeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeneratedTheme>
          }
          groupBy: {
            args: Prisma.GeneratedThemeGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeneratedThemeGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeneratedThemeCountArgs<ExtArgs>
            result: $Utils.Optional<GeneratedThemeCountAggregateOutputType> | number
          }
        }
      }
      NeutralPalette: {
        payload: Prisma.$NeutralPalettePayload<ExtArgs>
        fields: Prisma.NeutralPaletteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NeutralPaletteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NeutralPaletteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload>
          }
          findFirst: {
            args: Prisma.NeutralPaletteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NeutralPaletteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload>
          }
          findMany: {
            args: Prisma.NeutralPaletteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload>[]
          }
          create: {
            args: Prisma.NeutralPaletteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload>
          }
          createMany: {
            args: Prisma.NeutralPaletteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NeutralPaletteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload>[]
          }
          delete: {
            args: Prisma.NeutralPaletteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload>
          }
          update: {
            args: Prisma.NeutralPaletteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload>
          }
          deleteMany: {
            args: Prisma.NeutralPaletteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NeutralPaletteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NeutralPaletteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload>[]
          }
          upsert: {
            args: Prisma.NeutralPaletteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeutralPalettePayload>
          }
          aggregate: {
            args: Prisma.NeutralPaletteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNeutralPalette>
          }
          groupBy: {
            args: Prisma.NeutralPaletteGroupByArgs<ExtArgs>
            result: $Utils.Optional<NeutralPaletteGroupByOutputType>[]
          }
          count: {
            args: Prisma.NeutralPaletteCountArgs<ExtArgs>
            result: $Utils.Optional<NeutralPaletteCountAggregateOutputType> | number
          }
        }
      }
      Theme: {
        payload: Prisma.$ThemePayload<ExtArgs>
        fields: Prisma.ThemeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ThemeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ThemeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          findFirst: {
            args: Prisma.ThemeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ThemeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          findMany: {
            args: Prisma.ThemeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>[]
          }
          create: {
            args: Prisma.ThemeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          createMany: {
            args: Prisma.ThemeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ThemeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>[]
          }
          delete: {
            args: Prisma.ThemeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          update: {
            args: Prisma.ThemeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          deleteMany: {
            args: Prisma.ThemeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ThemeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ThemeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>[]
          }
          upsert: {
            args: Prisma.ThemeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          aggregate: {
            args: Prisma.ThemeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTheme>
          }
          groupBy: {
            args: Prisma.ThemeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ThemeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ThemeCountArgs<ExtArgs>
            result: $Utils.Optional<ThemeCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      OrganizationMember: {
        payload: Prisma.$OrganizationMemberPayload<ExtArgs>
        fields: Prisma.OrganizationMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload>
          }
          findFirst: {
            args: Prisma.OrganizationMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload>
          }
          findMany: {
            args: Prisma.OrganizationMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload>[]
          }
          create: {
            args: Prisma.OrganizationMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload>
          }
          createMany: {
            args: Prisma.OrganizationMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload>[]
          }
          delete: {
            args: Prisma.OrganizationMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload>
          }
          update: {
            args: Prisma.OrganizationMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationMemberPayload>
          }
          aggregate: {
            args: Prisma.OrganizationMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationMember>
          }
          groupBy: {
            args: Prisma.OrganizationMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationMemberCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationMemberCountAggregateOutputType> | number
          }
        }
      }
      Purchase: {
        payload: Prisma.$PurchasePayload<ExtArgs>
        fields: Prisma.PurchaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurchaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurchaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          findFirst: {
            args: Prisma.PurchaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurchaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          findMany: {
            args: Prisma.PurchaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>[]
          }
          create: {
            args: Prisma.PurchaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          createMany: {
            args: Prisma.PurchaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PurchaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>[]
          }
          delete: {
            args: Prisma.PurchaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          update: {
            args: Prisma.PurchaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          deleteMany: {
            args: Prisma.PurchaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurchaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PurchaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>[]
          }
          upsert: {
            args: Prisma.PurchaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          aggregate: {
            args: Prisma.PurchaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchase>
          }
          groupBy: {
            args: Prisma.PurchaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurchaseCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseCountAggregateOutputType> | number
          }
        }
      }
      ThemeShare: {
        payload: Prisma.$ThemeSharePayload<ExtArgs>
        fields: Prisma.ThemeShareFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ThemeShareFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ThemeShareFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload>
          }
          findFirst: {
            args: Prisma.ThemeShareFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ThemeShareFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload>
          }
          findMany: {
            args: Prisma.ThemeShareFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload>[]
          }
          create: {
            args: Prisma.ThemeShareCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload>
          }
          createMany: {
            args: Prisma.ThemeShareCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ThemeShareCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload>[]
          }
          delete: {
            args: Prisma.ThemeShareDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload>
          }
          update: {
            args: Prisma.ThemeShareUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload>
          }
          deleteMany: {
            args: Prisma.ThemeShareDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ThemeShareUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ThemeShareUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload>[]
          }
          upsert: {
            args: Prisma.ThemeShareUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemeSharePayload>
          }
          aggregate: {
            args: Prisma.ThemeShareAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateThemeShare>
          }
          groupBy: {
            args: Prisma.ThemeShareGroupByArgs<ExtArgs>
            result: $Utils.Optional<ThemeShareGroupByOutputType>[]
          }
          count: {
            args: Prisma.ThemeShareCountArgs<ExtArgs>
            result: $Utils.Optional<ThemeShareCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    colorPalette?: ColorPaletteOmit
    generatedTheme?: GeneratedThemeOmit
    neutralPalette?: NeutralPaletteOmit
    theme?: ThemeOmit
    user?: UserOmit
    organization?: OrganizationOmit
    organizationMember?: OrganizationMemberOmit
    purchase?: PurchaseOmit
    themeShare?: ThemeShareOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ThemeCountOutputType
   */

  export type ThemeCountOutputType = {
    generatedThemes: number
    sharedWith: number
  }

  export type ThemeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    generatedThemes?: boolean | ThemeCountOutputTypeCountGeneratedThemesArgs
    sharedWith?: boolean | ThemeCountOutputTypeCountSharedWithArgs
  }

  // Custom InputTypes
  /**
   * ThemeCountOutputType without action
   */
  export type ThemeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeCountOutputType
     */
    select?: ThemeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ThemeCountOutputType without action
   */
  export type ThemeCountOutputTypeCountGeneratedThemesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneratedThemeWhereInput
  }

  /**
   * ThemeCountOutputType without action
   */
  export type ThemeCountOutputTypeCountSharedWithArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThemeShareWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    themes: number
    colorPalettes: number
    neutralPalettes: number
    organizationMemberships: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    themes?: boolean | UserCountOutputTypeCountThemesArgs
    colorPalettes?: boolean | UserCountOutputTypeCountColorPalettesArgs
    neutralPalettes?: boolean | UserCountOutputTypeCountNeutralPalettesArgs
    organizationMemberships?: boolean | UserCountOutputTypeCountOrganizationMembershipsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountThemesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThemeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountColorPalettesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColorPaletteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNeutralPalettesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NeutralPaletteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrganizationMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationMemberWhereInput
  }


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    members: number
    themes: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | OrganizationCountOutputTypeCountMembersArgs
    themes?: boolean | OrganizationCountOutputTypeCountThemesArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationMemberWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountThemesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThemeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ColorPalette
   */

  export type AggregateColorPalette = {
    _count: ColorPaletteCountAggregateOutputType | null
    _min: ColorPaletteMinAggregateOutputType | null
    _max: ColorPaletteMaxAggregateOutputType | null
  }

  export type ColorPaletteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    isBuiltIn: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ColorPaletteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    isBuiltIn: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ColorPaletteCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    colors: number
    isBuiltIn: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ColorPaletteMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    isBuiltIn?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ColorPaletteMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    isBuiltIn?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ColorPaletteCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    colors?: true
    isBuiltIn?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ColorPaletteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ColorPalette to aggregate.
     */
    where?: ColorPaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColorPalettes to fetch.
     */
    orderBy?: ColorPaletteOrderByWithRelationInput | ColorPaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColorPaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColorPalettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColorPalettes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ColorPalettes
    **/
    _count?: true | ColorPaletteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColorPaletteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColorPaletteMaxAggregateInputType
  }

  export type GetColorPaletteAggregateType<T extends ColorPaletteAggregateArgs> = {
        [P in keyof T & keyof AggregateColorPalette]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColorPalette[P]>
      : GetScalarType<T[P], AggregateColorPalette[P]>
  }




  export type ColorPaletteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColorPaletteWhereInput
    orderBy?: ColorPaletteOrderByWithAggregationInput | ColorPaletteOrderByWithAggregationInput[]
    by: ColorPaletteScalarFieldEnum[] | ColorPaletteScalarFieldEnum
    having?: ColorPaletteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColorPaletteCountAggregateInputType | true
    _min?: ColorPaletteMinAggregateInputType
    _max?: ColorPaletteMaxAggregateInputType
  }

  export type ColorPaletteGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    colors: JsonValue
    isBuiltIn: boolean
    createdAt: Date
    updatedAt: Date
    _count: ColorPaletteCountAggregateOutputType | null
    _min: ColorPaletteMinAggregateOutputType | null
    _max: ColorPaletteMaxAggregateOutputType | null
  }

  type GetColorPaletteGroupByPayload<T extends ColorPaletteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColorPaletteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColorPaletteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColorPaletteGroupByOutputType[P]>
            : GetScalarType<T[P], ColorPaletteGroupByOutputType[P]>
        }
      >
    >


  export type ColorPaletteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    colors?: boolean
    isBuiltIn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colorPalette"]>

  export type ColorPaletteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    colors?: boolean
    isBuiltIn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colorPalette"]>

  export type ColorPaletteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    colors?: boolean
    isBuiltIn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colorPalette"]>

  export type ColorPaletteSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    colors?: boolean
    isBuiltIn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ColorPaletteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "description" | "colors" | "isBuiltIn" | "createdAt" | "updatedAt", ExtArgs["result"]["colorPalette"]>
  export type ColorPaletteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ColorPaletteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ColorPaletteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ColorPalettePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ColorPalette"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      colors: Prisma.JsonValue
      isBuiltIn: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["colorPalette"]>
    composites: {}
  }

  type ColorPaletteGetPayload<S extends boolean | null | undefined | ColorPaletteDefaultArgs> = $Result.GetResult<Prisma.$ColorPalettePayload, S>

  type ColorPaletteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColorPaletteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ColorPaletteCountAggregateInputType | true
    }

  export interface ColorPaletteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ColorPalette'], meta: { name: 'ColorPalette' } }
    /**
     * Find zero or one ColorPalette that matches the filter.
     * @param {ColorPaletteFindUniqueArgs} args - Arguments to find a ColorPalette
     * @example
     * // Get one ColorPalette
     * const colorPalette = await prisma.colorPalette.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColorPaletteFindUniqueArgs>(args: SelectSubset<T, ColorPaletteFindUniqueArgs<ExtArgs>>): Prisma__ColorPaletteClient<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ColorPalette that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColorPaletteFindUniqueOrThrowArgs} args - Arguments to find a ColorPalette
     * @example
     * // Get one ColorPalette
     * const colorPalette = await prisma.colorPalette.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColorPaletteFindUniqueOrThrowArgs>(args: SelectSubset<T, ColorPaletteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColorPaletteClient<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ColorPalette that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorPaletteFindFirstArgs} args - Arguments to find a ColorPalette
     * @example
     * // Get one ColorPalette
     * const colorPalette = await prisma.colorPalette.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColorPaletteFindFirstArgs>(args?: SelectSubset<T, ColorPaletteFindFirstArgs<ExtArgs>>): Prisma__ColorPaletteClient<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ColorPalette that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorPaletteFindFirstOrThrowArgs} args - Arguments to find a ColorPalette
     * @example
     * // Get one ColorPalette
     * const colorPalette = await prisma.colorPalette.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColorPaletteFindFirstOrThrowArgs>(args?: SelectSubset<T, ColorPaletteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColorPaletteClient<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ColorPalettes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorPaletteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ColorPalettes
     * const colorPalettes = await prisma.colorPalette.findMany()
     * 
     * // Get first 10 ColorPalettes
     * const colorPalettes = await prisma.colorPalette.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const colorPaletteWithIdOnly = await prisma.colorPalette.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColorPaletteFindManyArgs>(args?: SelectSubset<T, ColorPaletteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ColorPalette.
     * @param {ColorPaletteCreateArgs} args - Arguments to create a ColorPalette.
     * @example
     * // Create one ColorPalette
     * const ColorPalette = await prisma.colorPalette.create({
     *   data: {
     *     // ... data to create a ColorPalette
     *   }
     * })
     * 
     */
    create<T extends ColorPaletteCreateArgs>(args: SelectSubset<T, ColorPaletteCreateArgs<ExtArgs>>): Prisma__ColorPaletteClient<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ColorPalettes.
     * @param {ColorPaletteCreateManyArgs} args - Arguments to create many ColorPalettes.
     * @example
     * // Create many ColorPalettes
     * const colorPalette = await prisma.colorPalette.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColorPaletteCreateManyArgs>(args?: SelectSubset<T, ColorPaletteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ColorPalettes and returns the data saved in the database.
     * @param {ColorPaletteCreateManyAndReturnArgs} args - Arguments to create many ColorPalettes.
     * @example
     * // Create many ColorPalettes
     * const colorPalette = await prisma.colorPalette.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ColorPalettes and only return the `id`
     * const colorPaletteWithIdOnly = await prisma.colorPalette.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColorPaletteCreateManyAndReturnArgs>(args?: SelectSubset<T, ColorPaletteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ColorPalette.
     * @param {ColorPaletteDeleteArgs} args - Arguments to delete one ColorPalette.
     * @example
     * // Delete one ColorPalette
     * const ColorPalette = await prisma.colorPalette.delete({
     *   where: {
     *     // ... filter to delete one ColorPalette
     *   }
     * })
     * 
     */
    delete<T extends ColorPaletteDeleteArgs>(args: SelectSubset<T, ColorPaletteDeleteArgs<ExtArgs>>): Prisma__ColorPaletteClient<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ColorPalette.
     * @param {ColorPaletteUpdateArgs} args - Arguments to update one ColorPalette.
     * @example
     * // Update one ColorPalette
     * const colorPalette = await prisma.colorPalette.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColorPaletteUpdateArgs>(args: SelectSubset<T, ColorPaletteUpdateArgs<ExtArgs>>): Prisma__ColorPaletteClient<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ColorPalettes.
     * @param {ColorPaletteDeleteManyArgs} args - Arguments to filter ColorPalettes to delete.
     * @example
     * // Delete a few ColorPalettes
     * const { count } = await prisma.colorPalette.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColorPaletteDeleteManyArgs>(args?: SelectSubset<T, ColorPaletteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ColorPalettes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorPaletteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ColorPalettes
     * const colorPalette = await prisma.colorPalette.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColorPaletteUpdateManyArgs>(args: SelectSubset<T, ColorPaletteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ColorPalettes and returns the data updated in the database.
     * @param {ColorPaletteUpdateManyAndReturnArgs} args - Arguments to update many ColorPalettes.
     * @example
     * // Update many ColorPalettes
     * const colorPalette = await prisma.colorPalette.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ColorPalettes and only return the `id`
     * const colorPaletteWithIdOnly = await prisma.colorPalette.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ColorPaletteUpdateManyAndReturnArgs>(args: SelectSubset<T, ColorPaletteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ColorPalette.
     * @param {ColorPaletteUpsertArgs} args - Arguments to update or create a ColorPalette.
     * @example
     * // Update or create a ColorPalette
     * const colorPalette = await prisma.colorPalette.upsert({
     *   create: {
     *     // ... data to create a ColorPalette
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ColorPalette we want to update
     *   }
     * })
     */
    upsert<T extends ColorPaletteUpsertArgs>(args: SelectSubset<T, ColorPaletteUpsertArgs<ExtArgs>>): Prisma__ColorPaletteClient<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ColorPalettes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorPaletteCountArgs} args - Arguments to filter ColorPalettes to count.
     * @example
     * // Count the number of ColorPalettes
     * const count = await prisma.colorPalette.count({
     *   where: {
     *     // ... the filter for the ColorPalettes we want to count
     *   }
     * })
    **/
    count<T extends ColorPaletteCountArgs>(
      args?: Subset<T, ColorPaletteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColorPaletteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ColorPalette.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorPaletteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ColorPaletteAggregateArgs>(args: Subset<T, ColorPaletteAggregateArgs>): Prisma.PrismaPromise<GetColorPaletteAggregateType<T>>

    /**
     * Group by ColorPalette.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorPaletteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ColorPaletteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColorPaletteGroupByArgs['orderBy'] }
        : { orderBy?: ColorPaletteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColorPaletteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColorPaletteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ColorPalette model
   */
  readonly fields: ColorPaletteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ColorPalette.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColorPaletteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ColorPalette model
   */
  interface ColorPaletteFieldRefs {
    readonly id: FieldRef<"ColorPalette", 'String'>
    readonly userId: FieldRef<"ColorPalette", 'String'>
    readonly name: FieldRef<"ColorPalette", 'String'>
    readonly description: FieldRef<"ColorPalette", 'String'>
    readonly colors: FieldRef<"ColorPalette", 'Json'>
    readonly isBuiltIn: FieldRef<"ColorPalette", 'Boolean'>
    readonly createdAt: FieldRef<"ColorPalette", 'DateTime'>
    readonly updatedAt: FieldRef<"ColorPalette", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ColorPalette findUnique
   */
  export type ColorPaletteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
    /**
     * Filter, which ColorPalette to fetch.
     */
    where: ColorPaletteWhereUniqueInput
  }

  /**
   * ColorPalette findUniqueOrThrow
   */
  export type ColorPaletteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
    /**
     * Filter, which ColorPalette to fetch.
     */
    where: ColorPaletteWhereUniqueInput
  }

  /**
   * ColorPalette findFirst
   */
  export type ColorPaletteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
    /**
     * Filter, which ColorPalette to fetch.
     */
    where?: ColorPaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColorPalettes to fetch.
     */
    orderBy?: ColorPaletteOrderByWithRelationInput | ColorPaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ColorPalettes.
     */
    cursor?: ColorPaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColorPalettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColorPalettes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ColorPalettes.
     */
    distinct?: ColorPaletteScalarFieldEnum | ColorPaletteScalarFieldEnum[]
  }

  /**
   * ColorPalette findFirstOrThrow
   */
  export type ColorPaletteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
    /**
     * Filter, which ColorPalette to fetch.
     */
    where?: ColorPaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColorPalettes to fetch.
     */
    orderBy?: ColorPaletteOrderByWithRelationInput | ColorPaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ColorPalettes.
     */
    cursor?: ColorPaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColorPalettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColorPalettes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ColorPalettes.
     */
    distinct?: ColorPaletteScalarFieldEnum | ColorPaletteScalarFieldEnum[]
  }

  /**
   * ColorPalette findMany
   */
  export type ColorPaletteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
    /**
     * Filter, which ColorPalettes to fetch.
     */
    where?: ColorPaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColorPalettes to fetch.
     */
    orderBy?: ColorPaletteOrderByWithRelationInput | ColorPaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ColorPalettes.
     */
    cursor?: ColorPaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColorPalettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColorPalettes.
     */
    skip?: number
    distinct?: ColorPaletteScalarFieldEnum | ColorPaletteScalarFieldEnum[]
  }

  /**
   * ColorPalette create
   */
  export type ColorPaletteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
    /**
     * The data needed to create a ColorPalette.
     */
    data: XOR<ColorPaletteCreateInput, ColorPaletteUncheckedCreateInput>
  }

  /**
   * ColorPalette createMany
   */
  export type ColorPaletteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ColorPalettes.
     */
    data: ColorPaletteCreateManyInput | ColorPaletteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ColorPalette createManyAndReturn
   */
  export type ColorPaletteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * The data used to create many ColorPalettes.
     */
    data: ColorPaletteCreateManyInput | ColorPaletteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ColorPalette update
   */
  export type ColorPaletteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
    /**
     * The data needed to update a ColorPalette.
     */
    data: XOR<ColorPaletteUpdateInput, ColorPaletteUncheckedUpdateInput>
    /**
     * Choose, which ColorPalette to update.
     */
    where: ColorPaletteWhereUniqueInput
  }

  /**
   * ColorPalette updateMany
   */
  export type ColorPaletteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ColorPalettes.
     */
    data: XOR<ColorPaletteUpdateManyMutationInput, ColorPaletteUncheckedUpdateManyInput>
    /**
     * Filter which ColorPalettes to update
     */
    where?: ColorPaletteWhereInput
    /**
     * Limit how many ColorPalettes to update.
     */
    limit?: number
  }

  /**
   * ColorPalette updateManyAndReturn
   */
  export type ColorPaletteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * The data used to update ColorPalettes.
     */
    data: XOR<ColorPaletteUpdateManyMutationInput, ColorPaletteUncheckedUpdateManyInput>
    /**
     * Filter which ColorPalettes to update
     */
    where?: ColorPaletteWhereInput
    /**
     * Limit how many ColorPalettes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ColorPalette upsert
   */
  export type ColorPaletteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
    /**
     * The filter to search for the ColorPalette to update in case it exists.
     */
    where: ColorPaletteWhereUniqueInput
    /**
     * In case the ColorPalette found by the `where` argument doesn't exist, create a new ColorPalette with this data.
     */
    create: XOR<ColorPaletteCreateInput, ColorPaletteUncheckedCreateInput>
    /**
     * In case the ColorPalette was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColorPaletteUpdateInput, ColorPaletteUncheckedUpdateInput>
  }

  /**
   * ColorPalette delete
   */
  export type ColorPaletteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
    /**
     * Filter which ColorPalette to delete.
     */
    where: ColorPaletteWhereUniqueInput
  }

  /**
   * ColorPalette deleteMany
   */
  export type ColorPaletteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ColorPalettes to delete
     */
    where?: ColorPaletteWhereInput
    /**
     * Limit how many ColorPalettes to delete.
     */
    limit?: number
  }

  /**
   * ColorPalette without action
   */
  export type ColorPaletteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
  }


  /**
   * Model GeneratedTheme
   */

  export type AggregateGeneratedTheme = {
    _count: GeneratedThemeCountAggregateOutputType | null
    _min: GeneratedThemeMinAggregateOutputType | null
    _max: GeneratedThemeMaxAggregateOutputType | null
  }

  export type GeneratedThemeMinAggregateOutputType = {
    id: string | null
    themeId: string | null
    version: string | null
    createdAt: Date | null
  }

  export type GeneratedThemeMaxAggregateOutputType = {
    id: string | null
    themeId: string | null
    version: string | null
    createdAt: Date | null
  }

  export type GeneratedThemeCountAggregateOutputType = {
    id: number
    themeId: number
    generatedJson: number
    version: number
    createdAt: number
    _all: number
  }


  export type GeneratedThemeMinAggregateInputType = {
    id?: true
    themeId?: true
    version?: true
    createdAt?: true
  }

  export type GeneratedThemeMaxAggregateInputType = {
    id?: true
    themeId?: true
    version?: true
    createdAt?: true
  }

  export type GeneratedThemeCountAggregateInputType = {
    id?: true
    themeId?: true
    generatedJson?: true
    version?: true
    createdAt?: true
    _all?: true
  }

  export type GeneratedThemeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneratedTheme to aggregate.
     */
    where?: GeneratedThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedThemes to fetch.
     */
    orderBy?: GeneratedThemeOrderByWithRelationInput | GeneratedThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeneratedThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedThemes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedThemes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeneratedThemes
    **/
    _count?: true | GeneratedThemeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeneratedThemeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeneratedThemeMaxAggregateInputType
  }

  export type GetGeneratedThemeAggregateType<T extends GeneratedThemeAggregateArgs> = {
        [P in keyof T & keyof AggregateGeneratedTheme]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeneratedTheme[P]>
      : GetScalarType<T[P], AggregateGeneratedTheme[P]>
  }




  export type GeneratedThemeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneratedThemeWhereInput
    orderBy?: GeneratedThemeOrderByWithAggregationInput | GeneratedThemeOrderByWithAggregationInput[]
    by: GeneratedThemeScalarFieldEnum[] | GeneratedThemeScalarFieldEnum
    having?: GeneratedThemeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeneratedThemeCountAggregateInputType | true
    _min?: GeneratedThemeMinAggregateInputType
    _max?: GeneratedThemeMaxAggregateInputType
  }

  export type GeneratedThemeGroupByOutputType = {
    id: string
    themeId: string
    generatedJson: JsonValue
    version: string
    createdAt: Date
    _count: GeneratedThemeCountAggregateOutputType | null
    _min: GeneratedThemeMinAggregateOutputType | null
    _max: GeneratedThemeMaxAggregateOutputType | null
  }

  type GetGeneratedThemeGroupByPayload<T extends GeneratedThemeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeneratedThemeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeneratedThemeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeneratedThemeGroupByOutputType[P]>
            : GetScalarType<T[P], GeneratedThemeGroupByOutputType[P]>
        }
      >
    >


  export type GeneratedThemeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    themeId?: boolean
    generatedJson?: boolean
    version?: boolean
    createdAt?: boolean
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generatedTheme"]>

  export type GeneratedThemeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    themeId?: boolean
    generatedJson?: boolean
    version?: boolean
    createdAt?: boolean
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generatedTheme"]>

  export type GeneratedThemeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    themeId?: boolean
    generatedJson?: boolean
    version?: boolean
    createdAt?: boolean
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generatedTheme"]>

  export type GeneratedThemeSelectScalar = {
    id?: boolean
    themeId?: boolean
    generatedJson?: boolean
    version?: boolean
    createdAt?: boolean
  }

  export type GeneratedThemeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "themeId" | "generatedJson" | "version" | "createdAt", ExtArgs["result"]["generatedTheme"]>
  export type GeneratedThemeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }
  export type GeneratedThemeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }
  export type GeneratedThemeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }

  export type $GeneratedThemePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeneratedTheme"
    objects: {
      theme: Prisma.$ThemePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      themeId: string
      generatedJson: Prisma.JsonValue
      version: string
      createdAt: Date
    }, ExtArgs["result"]["generatedTheme"]>
    composites: {}
  }

  type GeneratedThemeGetPayload<S extends boolean | null | undefined | GeneratedThemeDefaultArgs> = $Result.GetResult<Prisma.$GeneratedThemePayload, S>

  type GeneratedThemeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GeneratedThemeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GeneratedThemeCountAggregateInputType | true
    }

  export interface GeneratedThemeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeneratedTheme'], meta: { name: 'GeneratedTheme' } }
    /**
     * Find zero or one GeneratedTheme that matches the filter.
     * @param {GeneratedThemeFindUniqueArgs} args - Arguments to find a GeneratedTheme
     * @example
     * // Get one GeneratedTheme
     * const generatedTheme = await prisma.generatedTheme.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeneratedThemeFindUniqueArgs>(args: SelectSubset<T, GeneratedThemeFindUniqueArgs<ExtArgs>>): Prisma__GeneratedThemeClient<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GeneratedTheme that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GeneratedThemeFindUniqueOrThrowArgs} args - Arguments to find a GeneratedTheme
     * @example
     * // Get one GeneratedTheme
     * const generatedTheme = await prisma.generatedTheme.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeneratedThemeFindUniqueOrThrowArgs>(args: SelectSubset<T, GeneratedThemeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeneratedThemeClient<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneratedTheme that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedThemeFindFirstArgs} args - Arguments to find a GeneratedTheme
     * @example
     * // Get one GeneratedTheme
     * const generatedTheme = await prisma.generatedTheme.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeneratedThemeFindFirstArgs>(args?: SelectSubset<T, GeneratedThemeFindFirstArgs<ExtArgs>>): Prisma__GeneratedThemeClient<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneratedTheme that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedThemeFindFirstOrThrowArgs} args - Arguments to find a GeneratedTheme
     * @example
     * // Get one GeneratedTheme
     * const generatedTheme = await prisma.generatedTheme.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeneratedThemeFindFirstOrThrowArgs>(args?: SelectSubset<T, GeneratedThemeFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeneratedThemeClient<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GeneratedThemes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedThemeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeneratedThemes
     * const generatedThemes = await prisma.generatedTheme.findMany()
     * 
     * // Get first 10 GeneratedThemes
     * const generatedThemes = await prisma.generatedTheme.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const generatedThemeWithIdOnly = await prisma.generatedTheme.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeneratedThemeFindManyArgs>(args?: SelectSubset<T, GeneratedThemeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GeneratedTheme.
     * @param {GeneratedThemeCreateArgs} args - Arguments to create a GeneratedTheme.
     * @example
     * // Create one GeneratedTheme
     * const GeneratedTheme = await prisma.generatedTheme.create({
     *   data: {
     *     // ... data to create a GeneratedTheme
     *   }
     * })
     * 
     */
    create<T extends GeneratedThemeCreateArgs>(args: SelectSubset<T, GeneratedThemeCreateArgs<ExtArgs>>): Prisma__GeneratedThemeClient<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GeneratedThemes.
     * @param {GeneratedThemeCreateManyArgs} args - Arguments to create many GeneratedThemes.
     * @example
     * // Create many GeneratedThemes
     * const generatedTheme = await prisma.generatedTheme.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeneratedThemeCreateManyArgs>(args?: SelectSubset<T, GeneratedThemeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GeneratedThemes and returns the data saved in the database.
     * @param {GeneratedThemeCreateManyAndReturnArgs} args - Arguments to create many GeneratedThemes.
     * @example
     * // Create many GeneratedThemes
     * const generatedTheme = await prisma.generatedTheme.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GeneratedThemes and only return the `id`
     * const generatedThemeWithIdOnly = await prisma.generatedTheme.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GeneratedThemeCreateManyAndReturnArgs>(args?: SelectSubset<T, GeneratedThemeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GeneratedTheme.
     * @param {GeneratedThemeDeleteArgs} args - Arguments to delete one GeneratedTheme.
     * @example
     * // Delete one GeneratedTheme
     * const GeneratedTheme = await prisma.generatedTheme.delete({
     *   where: {
     *     // ... filter to delete one GeneratedTheme
     *   }
     * })
     * 
     */
    delete<T extends GeneratedThemeDeleteArgs>(args: SelectSubset<T, GeneratedThemeDeleteArgs<ExtArgs>>): Prisma__GeneratedThemeClient<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GeneratedTheme.
     * @param {GeneratedThemeUpdateArgs} args - Arguments to update one GeneratedTheme.
     * @example
     * // Update one GeneratedTheme
     * const generatedTheme = await prisma.generatedTheme.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeneratedThemeUpdateArgs>(args: SelectSubset<T, GeneratedThemeUpdateArgs<ExtArgs>>): Prisma__GeneratedThemeClient<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GeneratedThemes.
     * @param {GeneratedThemeDeleteManyArgs} args - Arguments to filter GeneratedThemes to delete.
     * @example
     * // Delete a few GeneratedThemes
     * const { count } = await prisma.generatedTheme.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeneratedThemeDeleteManyArgs>(args?: SelectSubset<T, GeneratedThemeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneratedThemes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedThemeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeneratedThemes
     * const generatedTheme = await prisma.generatedTheme.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeneratedThemeUpdateManyArgs>(args: SelectSubset<T, GeneratedThemeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneratedThemes and returns the data updated in the database.
     * @param {GeneratedThemeUpdateManyAndReturnArgs} args - Arguments to update many GeneratedThemes.
     * @example
     * // Update many GeneratedThemes
     * const generatedTheme = await prisma.generatedTheme.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GeneratedThemes and only return the `id`
     * const generatedThemeWithIdOnly = await prisma.generatedTheme.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GeneratedThemeUpdateManyAndReturnArgs>(args: SelectSubset<T, GeneratedThemeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GeneratedTheme.
     * @param {GeneratedThemeUpsertArgs} args - Arguments to update or create a GeneratedTheme.
     * @example
     * // Update or create a GeneratedTheme
     * const generatedTheme = await prisma.generatedTheme.upsert({
     *   create: {
     *     // ... data to create a GeneratedTheme
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeneratedTheme we want to update
     *   }
     * })
     */
    upsert<T extends GeneratedThemeUpsertArgs>(args: SelectSubset<T, GeneratedThemeUpsertArgs<ExtArgs>>): Prisma__GeneratedThemeClient<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GeneratedThemes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedThemeCountArgs} args - Arguments to filter GeneratedThemes to count.
     * @example
     * // Count the number of GeneratedThemes
     * const count = await prisma.generatedTheme.count({
     *   where: {
     *     // ... the filter for the GeneratedThemes we want to count
     *   }
     * })
    **/
    count<T extends GeneratedThemeCountArgs>(
      args?: Subset<T, GeneratedThemeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeneratedThemeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeneratedTheme.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedThemeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GeneratedThemeAggregateArgs>(args: Subset<T, GeneratedThemeAggregateArgs>): Prisma.PrismaPromise<GetGeneratedThemeAggregateType<T>>

    /**
     * Group by GeneratedTheme.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneratedThemeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GeneratedThemeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeneratedThemeGroupByArgs['orderBy'] }
        : { orderBy?: GeneratedThemeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GeneratedThemeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeneratedThemeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeneratedTheme model
   */
  readonly fields: GeneratedThemeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeneratedTheme.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeneratedThemeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    theme<T extends ThemeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ThemeDefaultArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GeneratedTheme model
   */
  interface GeneratedThemeFieldRefs {
    readonly id: FieldRef<"GeneratedTheme", 'String'>
    readonly themeId: FieldRef<"GeneratedTheme", 'String'>
    readonly generatedJson: FieldRef<"GeneratedTheme", 'Json'>
    readonly version: FieldRef<"GeneratedTheme", 'String'>
    readonly createdAt: FieldRef<"GeneratedTheme", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GeneratedTheme findUnique
   */
  export type GeneratedThemeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedTheme to fetch.
     */
    where: GeneratedThemeWhereUniqueInput
  }

  /**
   * GeneratedTheme findUniqueOrThrow
   */
  export type GeneratedThemeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedTheme to fetch.
     */
    where: GeneratedThemeWhereUniqueInput
  }

  /**
   * GeneratedTheme findFirst
   */
  export type GeneratedThemeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedTheme to fetch.
     */
    where?: GeneratedThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedThemes to fetch.
     */
    orderBy?: GeneratedThemeOrderByWithRelationInput | GeneratedThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneratedThemes.
     */
    cursor?: GeneratedThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedThemes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedThemes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedThemes.
     */
    distinct?: GeneratedThemeScalarFieldEnum | GeneratedThemeScalarFieldEnum[]
  }

  /**
   * GeneratedTheme findFirstOrThrow
   */
  export type GeneratedThemeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedTheme to fetch.
     */
    where?: GeneratedThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedThemes to fetch.
     */
    orderBy?: GeneratedThemeOrderByWithRelationInput | GeneratedThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneratedThemes.
     */
    cursor?: GeneratedThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedThemes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedThemes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneratedThemes.
     */
    distinct?: GeneratedThemeScalarFieldEnum | GeneratedThemeScalarFieldEnum[]
  }

  /**
   * GeneratedTheme findMany
   */
  export type GeneratedThemeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
    /**
     * Filter, which GeneratedThemes to fetch.
     */
    where?: GeneratedThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneratedThemes to fetch.
     */
    orderBy?: GeneratedThemeOrderByWithRelationInput | GeneratedThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeneratedThemes.
     */
    cursor?: GeneratedThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneratedThemes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneratedThemes.
     */
    skip?: number
    distinct?: GeneratedThemeScalarFieldEnum | GeneratedThemeScalarFieldEnum[]
  }

  /**
   * GeneratedTheme create
   */
  export type GeneratedThemeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
    /**
     * The data needed to create a GeneratedTheme.
     */
    data: XOR<GeneratedThemeCreateInput, GeneratedThemeUncheckedCreateInput>
  }

  /**
   * GeneratedTheme createMany
   */
  export type GeneratedThemeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeneratedThemes.
     */
    data: GeneratedThemeCreateManyInput | GeneratedThemeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeneratedTheme createManyAndReturn
   */
  export type GeneratedThemeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * The data used to create many GeneratedThemes.
     */
    data: GeneratedThemeCreateManyInput | GeneratedThemeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GeneratedTheme update
   */
  export type GeneratedThemeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
    /**
     * The data needed to update a GeneratedTheme.
     */
    data: XOR<GeneratedThemeUpdateInput, GeneratedThemeUncheckedUpdateInput>
    /**
     * Choose, which GeneratedTheme to update.
     */
    where: GeneratedThemeWhereUniqueInput
  }

  /**
   * GeneratedTheme updateMany
   */
  export type GeneratedThemeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeneratedThemes.
     */
    data: XOR<GeneratedThemeUpdateManyMutationInput, GeneratedThemeUncheckedUpdateManyInput>
    /**
     * Filter which GeneratedThemes to update
     */
    where?: GeneratedThemeWhereInput
    /**
     * Limit how many GeneratedThemes to update.
     */
    limit?: number
  }

  /**
   * GeneratedTheme updateManyAndReturn
   */
  export type GeneratedThemeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * The data used to update GeneratedThemes.
     */
    data: XOR<GeneratedThemeUpdateManyMutationInput, GeneratedThemeUncheckedUpdateManyInput>
    /**
     * Filter which GeneratedThemes to update
     */
    where?: GeneratedThemeWhereInput
    /**
     * Limit how many GeneratedThemes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GeneratedTheme upsert
   */
  export type GeneratedThemeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
    /**
     * The filter to search for the GeneratedTheme to update in case it exists.
     */
    where: GeneratedThemeWhereUniqueInput
    /**
     * In case the GeneratedTheme found by the `where` argument doesn't exist, create a new GeneratedTheme with this data.
     */
    create: XOR<GeneratedThemeCreateInput, GeneratedThemeUncheckedCreateInput>
    /**
     * In case the GeneratedTheme was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeneratedThemeUpdateInput, GeneratedThemeUncheckedUpdateInput>
  }

  /**
   * GeneratedTheme delete
   */
  export type GeneratedThemeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
    /**
     * Filter which GeneratedTheme to delete.
     */
    where: GeneratedThemeWhereUniqueInput
  }

  /**
   * GeneratedTheme deleteMany
   */
  export type GeneratedThemeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneratedThemes to delete
     */
    where?: GeneratedThemeWhereInput
    /**
     * Limit how many GeneratedThemes to delete.
     */
    limit?: number
  }

  /**
   * GeneratedTheme without action
   */
  export type GeneratedThemeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
  }


  /**
   * Model NeutralPalette
   */

  export type AggregateNeutralPalette = {
    _count: NeutralPaletteCountAggregateOutputType | null
    _min: NeutralPaletteMinAggregateOutputType | null
    _max: NeutralPaletteMaxAggregateOutputType | null
  }

  export type NeutralPaletteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    isBuiltIn: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NeutralPaletteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    isBuiltIn: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NeutralPaletteCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    colors: number
    isBuiltIn: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NeutralPaletteMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    isBuiltIn?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NeutralPaletteMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    isBuiltIn?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NeutralPaletteCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    colors?: true
    isBuiltIn?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NeutralPaletteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NeutralPalette to aggregate.
     */
    where?: NeutralPaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NeutralPalettes to fetch.
     */
    orderBy?: NeutralPaletteOrderByWithRelationInput | NeutralPaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NeutralPaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NeutralPalettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NeutralPalettes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NeutralPalettes
    **/
    _count?: true | NeutralPaletteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NeutralPaletteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NeutralPaletteMaxAggregateInputType
  }

  export type GetNeutralPaletteAggregateType<T extends NeutralPaletteAggregateArgs> = {
        [P in keyof T & keyof AggregateNeutralPalette]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNeutralPalette[P]>
      : GetScalarType<T[P], AggregateNeutralPalette[P]>
  }




  export type NeutralPaletteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NeutralPaletteWhereInput
    orderBy?: NeutralPaletteOrderByWithAggregationInput | NeutralPaletteOrderByWithAggregationInput[]
    by: NeutralPaletteScalarFieldEnum[] | NeutralPaletteScalarFieldEnum
    having?: NeutralPaletteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NeutralPaletteCountAggregateInputType | true
    _min?: NeutralPaletteMinAggregateInputType
    _max?: NeutralPaletteMaxAggregateInputType
  }

  export type NeutralPaletteGroupByOutputType = {
    id: string
    userId: string | null
    name: string
    colors: JsonValue
    isBuiltIn: boolean
    createdAt: Date
    updatedAt: Date
    _count: NeutralPaletteCountAggregateOutputType | null
    _min: NeutralPaletteMinAggregateOutputType | null
    _max: NeutralPaletteMaxAggregateOutputType | null
  }

  type GetNeutralPaletteGroupByPayload<T extends NeutralPaletteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NeutralPaletteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NeutralPaletteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NeutralPaletteGroupByOutputType[P]>
            : GetScalarType<T[P], NeutralPaletteGroupByOutputType[P]>
        }
      >
    >


  export type NeutralPaletteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    colors?: boolean
    isBuiltIn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | NeutralPalette$userArgs<ExtArgs>
  }, ExtArgs["result"]["neutralPalette"]>

  export type NeutralPaletteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    colors?: boolean
    isBuiltIn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | NeutralPalette$userArgs<ExtArgs>
  }, ExtArgs["result"]["neutralPalette"]>

  export type NeutralPaletteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    colors?: boolean
    isBuiltIn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | NeutralPalette$userArgs<ExtArgs>
  }, ExtArgs["result"]["neutralPalette"]>

  export type NeutralPaletteSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    colors?: boolean
    isBuiltIn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NeutralPaletteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "colors" | "isBuiltIn" | "createdAt" | "updatedAt", ExtArgs["result"]["neutralPalette"]>
  export type NeutralPaletteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | NeutralPalette$userArgs<ExtArgs>
  }
  export type NeutralPaletteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | NeutralPalette$userArgs<ExtArgs>
  }
  export type NeutralPaletteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | NeutralPalette$userArgs<ExtArgs>
  }

  export type $NeutralPalettePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NeutralPalette"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      name: string
      colors: Prisma.JsonValue
      isBuiltIn: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["neutralPalette"]>
    composites: {}
  }

  type NeutralPaletteGetPayload<S extends boolean | null | undefined | NeutralPaletteDefaultArgs> = $Result.GetResult<Prisma.$NeutralPalettePayload, S>

  type NeutralPaletteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NeutralPaletteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NeutralPaletteCountAggregateInputType | true
    }

  export interface NeutralPaletteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NeutralPalette'], meta: { name: 'NeutralPalette' } }
    /**
     * Find zero or one NeutralPalette that matches the filter.
     * @param {NeutralPaletteFindUniqueArgs} args - Arguments to find a NeutralPalette
     * @example
     * // Get one NeutralPalette
     * const neutralPalette = await prisma.neutralPalette.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NeutralPaletteFindUniqueArgs>(args: SelectSubset<T, NeutralPaletteFindUniqueArgs<ExtArgs>>): Prisma__NeutralPaletteClient<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NeutralPalette that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NeutralPaletteFindUniqueOrThrowArgs} args - Arguments to find a NeutralPalette
     * @example
     * // Get one NeutralPalette
     * const neutralPalette = await prisma.neutralPalette.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NeutralPaletteFindUniqueOrThrowArgs>(args: SelectSubset<T, NeutralPaletteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NeutralPaletteClient<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NeutralPalette that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeutralPaletteFindFirstArgs} args - Arguments to find a NeutralPalette
     * @example
     * // Get one NeutralPalette
     * const neutralPalette = await prisma.neutralPalette.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NeutralPaletteFindFirstArgs>(args?: SelectSubset<T, NeutralPaletteFindFirstArgs<ExtArgs>>): Prisma__NeutralPaletteClient<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NeutralPalette that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeutralPaletteFindFirstOrThrowArgs} args - Arguments to find a NeutralPalette
     * @example
     * // Get one NeutralPalette
     * const neutralPalette = await prisma.neutralPalette.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NeutralPaletteFindFirstOrThrowArgs>(args?: SelectSubset<T, NeutralPaletteFindFirstOrThrowArgs<ExtArgs>>): Prisma__NeutralPaletteClient<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NeutralPalettes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeutralPaletteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NeutralPalettes
     * const neutralPalettes = await prisma.neutralPalette.findMany()
     * 
     * // Get first 10 NeutralPalettes
     * const neutralPalettes = await prisma.neutralPalette.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const neutralPaletteWithIdOnly = await prisma.neutralPalette.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NeutralPaletteFindManyArgs>(args?: SelectSubset<T, NeutralPaletteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NeutralPalette.
     * @param {NeutralPaletteCreateArgs} args - Arguments to create a NeutralPalette.
     * @example
     * // Create one NeutralPalette
     * const NeutralPalette = await prisma.neutralPalette.create({
     *   data: {
     *     // ... data to create a NeutralPalette
     *   }
     * })
     * 
     */
    create<T extends NeutralPaletteCreateArgs>(args: SelectSubset<T, NeutralPaletteCreateArgs<ExtArgs>>): Prisma__NeutralPaletteClient<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NeutralPalettes.
     * @param {NeutralPaletteCreateManyArgs} args - Arguments to create many NeutralPalettes.
     * @example
     * // Create many NeutralPalettes
     * const neutralPalette = await prisma.neutralPalette.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NeutralPaletteCreateManyArgs>(args?: SelectSubset<T, NeutralPaletteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NeutralPalettes and returns the data saved in the database.
     * @param {NeutralPaletteCreateManyAndReturnArgs} args - Arguments to create many NeutralPalettes.
     * @example
     * // Create many NeutralPalettes
     * const neutralPalette = await prisma.neutralPalette.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NeutralPalettes and only return the `id`
     * const neutralPaletteWithIdOnly = await prisma.neutralPalette.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NeutralPaletteCreateManyAndReturnArgs>(args?: SelectSubset<T, NeutralPaletteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NeutralPalette.
     * @param {NeutralPaletteDeleteArgs} args - Arguments to delete one NeutralPalette.
     * @example
     * // Delete one NeutralPalette
     * const NeutralPalette = await prisma.neutralPalette.delete({
     *   where: {
     *     // ... filter to delete one NeutralPalette
     *   }
     * })
     * 
     */
    delete<T extends NeutralPaletteDeleteArgs>(args: SelectSubset<T, NeutralPaletteDeleteArgs<ExtArgs>>): Prisma__NeutralPaletteClient<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NeutralPalette.
     * @param {NeutralPaletteUpdateArgs} args - Arguments to update one NeutralPalette.
     * @example
     * // Update one NeutralPalette
     * const neutralPalette = await prisma.neutralPalette.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NeutralPaletteUpdateArgs>(args: SelectSubset<T, NeutralPaletteUpdateArgs<ExtArgs>>): Prisma__NeutralPaletteClient<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NeutralPalettes.
     * @param {NeutralPaletteDeleteManyArgs} args - Arguments to filter NeutralPalettes to delete.
     * @example
     * // Delete a few NeutralPalettes
     * const { count } = await prisma.neutralPalette.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NeutralPaletteDeleteManyArgs>(args?: SelectSubset<T, NeutralPaletteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NeutralPalettes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeutralPaletteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NeutralPalettes
     * const neutralPalette = await prisma.neutralPalette.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NeutralPaletteUpdateManyArgs>(args: SelectSubset<T, NeutralPaletteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NeutralPalettes and returns the data updated in the database.
     * @param {NeutralPaletteUpdateManyAndReturnArgs} args - Arguments to update many NeutralPalettes.
     * @example
     * // Update many NeutralPalettes
     * const neutralPalette = await prisma.neutralPalette.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NeutralPalettes and only return the `id`
     * const neutralPaletteWithIdOnly = await prisma.neutralPalette.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NeutralPaletteUpdateManyAndReturnArgs>(args: SelectSubset<T, NeutralPaletteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NeutralPalette.
     * @param {NeutralPaletteUpsertArgs} args - Arguments to update or create a NeutralPalette.
     * @example
     * // Update or create a NeutralPalette
     * const neutralPalette = await prisma.neutralPalette.upsert({
     *   create: {
     *     // ... data to create a NeutralPalette
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NeutralPalette we want to update
     *   }
     * })
     */
    upsert<T extends NeutralPaletteUpsertArgs>(args: SelectSubset<T, NeutralPaletteUpsertArgs<ExtArgs>>): Prisma__NeutralPaletteClient<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NeutralPalettes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeutralPaletteCountArgs} args - Arguments to filter NeutralPalettes to count.
     * @example
     * // Count the number of NeutralPalettes
     * const count = await prisma.neutralPalette.count({
     *   where: {
     *     // ... the filter for the NeutralPalettes we want to count
     *   }
     * })
    **/
    count<T extends NeutralPaletteCountArgs>(
      args?: Subset<T, NeutralPaletteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NeutralPaletteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NeutralPalette.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeutralPaletteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NeutralPaletteAggregateArgs>(args: Subset<T, NeutralPaletteAggregateArgs>): Prisma.PrismaPromise<GetNeutralPaletteAggregateType<T>>

    /**
     * Group by NeutralPalette.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeutralPaletteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NeutralPaletteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NeutralPaletteGroupByArgs['orderBy'] }
        : { orderBy?: NeutralPaletteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NeutralPaletteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNeutralPaletteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NeutralPalette model
   */
  readonly fields: NeutralPaletteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NeutralPalette.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NeutralPaletteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends NeutralPalette$userArgs<ExtArgs> = {}>(args?: Subset<T, NeutralPalette$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NeutralPalette model
   */
  interface NeutralPaletteFieldRefs {
    readonly id: FieldRef<"NeutralPalette", 'String'>
    readonly userId: FieldRef<"NeutralPalette", 'String'>
    readonly name: FieldRef<"NeutralPalette", 'String'>
    readonly colors: FieldRef<"NeutralPalette", 'Json'>
    readonly isBuiltIn: FieldRef<"NeutralPalette", 'Boolean'>
    readonly createdAt: FieldRef<"NeutralPalette", 'DateTime'>
    readonly updatedAt: FieldRef<"NeutralPalette", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NeutralPalette findUnique
   */
  export type NeutralPaletteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
    /**
     * Filter, which NeutralPalette to fetch.
     */
    where: NeutralPaletteWhereUniqueInput
  }

  /**
   * NeutralPalette findUniqueOrThrow
   */
  export type NeutralPaletteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
    /**
     * Filter, which NeutralPalette to fetch.
     */
    where: NeutralPaletteWhereUniqueInput
  }

  /**
   * NeutralPalette findFirst
   */
  export type NeutralPaletteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
    /**
     * Filter, which NeutralPalette to fetch.
     */
    where?: NeutralPaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NeutralPalettes to fetch.
     */
    orderBy?: NeutralPaletteOrderByWithRelationInput | NeutralPaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NeutralPalettes.
     */
    cursor?: NeutralPaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NeutralPalettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NeutralPalettes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NeutralPalettes.
     */
    distinct?: NeutralPaletteScalarFieldEnum | NeutralPaletteScalarFieldEnum[]
  }

  /**
   * NeutralPalette findFirstOrThrow
   */
  export type NeutralPaletteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
    /**
     * Filter, which NeutralPalette to fetch.
     */
    where?: NeutralPaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NeutralPalettes to fetch.
     */
    orderBy?: NeutralPaletteOrderByWithRelationInput | NeutralPaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NeutralPalettes.
     */
    cursor?: NeutralPaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NeutralPalettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NeutralPalettes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NeutralPalettes.
     */
    distinct?: NeutralPaletteScalarFieldEnum | NeutralPaletteScalarFieldEnum[]
  }

  /**
   * NeutralPalette findMany
   */
  export type NeutralPaletteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
    /**
     * Filter, which NeutralPalettes to fetch.
     */
    where?: NeutralPaletteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NeutralPalettes to fetch.
     */
    orderBy?: NeutralPaletteOrderByWithRelationInput | NeutralPaletteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NeutralPalettes.
     */
    cursor?: NeutralPaletteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NeutralPalettes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NeutralPalettes.
     */
    skip?: number
    distinct?: NeutralPaletteScalarFieldEnum | NeutralPaletteScalarFieldEnum[]
  }

  /**
   * NeutralPalette create
   */
  export type NeutralPaletteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
    /**
     * The data needed to create a NeutralPalette.
     */
    data: XOR<NeutralPaletteCreateInput, NeutralPaletteUncheckedCreateInput>
  }

  /**
   * NeutralPalette createMany
   */
  export type NeutralPaletteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NeutralPalettes.
     */
    data: NeutralPaletteCreateManyInput | NeutralPaletteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NeutralPalette createManyAndReturn
   */
  export type NeutralPaletteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * The data used to create many NeutralPalettes.
     */
    data: NeutralPaletteCreateManyInput | NeutralPaletteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NeutralPalette update
   */
  export type NeutralPaletteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
    /**
     * The data needed to update a NeutralPalette.
     */
    data: XOR<NeutralPaletteUpdateInput, NeutralPaletteUncheckedUpdateInput>
    /**
     * Choose, which NeutralPalette to update.
     */
    where: NeutralPaletteWhereUniqueInput
  }

  /**
   * NeutralPalette updateMany
   */
  export type NeutralPaletteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NeutralPalettes.
     */
    data: XOR<NeutralPaletteUpdateManyMutationInput, NeutralPaletteUncheckedUpdateManyInput>
    /**
     * Filter which NeutralPalettes to update
     */
    where?: NeutralPaletteWhereInput
    /**
     * Limit how many NeutralPalettes to update.
     */
    limit?: number
  }

  /**
   * NeutralPalette updateManyAndReturn
   */
  export type NeutralPaletteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * The data used to update NeutralPalettes.
     */
    data: XOR<NeutralPaletteUpdateManyMutationInput, NeutralPaletteUncheckedUpdateManyInput>
    /**
     * Filter which NeutralPalettes to update
     */
    where?: NeutralPaletteWhereInput
    /**
     * Limit how many NeutralPalettes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NeutralPalette upsert
   */
  export type NeutralPaletteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
    /**
     * The filter to search for the NeutralPalette to update in case it exists.
     */
    where: NeutralPaletteWhereUniqueInput
    /**
     * In case the NeutralPalette found by the `where` argument doesn't exist, create a new NeutralPalette with this data.
     */
    create: XOR<NeutralPaletteCreateInput, NeutralPaletteUncheckedCreateInput>
    /**
     * In case the NeutralPalette was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NeutralPaletteUpdateInput, NeutralPaletteUncheckedUpdateInput>
  }

  /**
   * NeutralPalette delete
   */
  export type NeutralPaletteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
    /**
     * Filter which NeutralPalette to delete.
     */
    where: NeutralPaletteWhereUniqueInput
  }

  /**
   * NeutralPalette deleteMany
   */
  export type NeutralPaletteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NeutralPalettes to delete
     */
    where?: NeutralPaletteWhereInput
    /**
     * Limit how many NeutralPalettes to delete.
     */
    limit?: number
  }

  /**
   * NeutralPalette.user
   */
  export type NeutralPalette$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * NeutralPalette without action
   */
  export type NeutralPaletteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
  }


  /**
   * Model Theme
   */

  export type AggregateTheme = {
    _count: ThemeCountAggregateOutputType | null
    _min: ThemeMinAggregateOutputType | null
    _max: ThemeMaxAggregateOutputType | null
  }

  export type ThemeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    version: string | null
    isDefault: boolean | null
    organizationId: string | null
    visibility: $Enums.ThemeVisibility | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ThemeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    version: string | null
    isDefault: boolean | null
    organizationId: string | null
    visibility: $Enums.ThemeVisibility | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ThemeCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    themeData: number
    version: number
    isDefault: number
    organizationId: number
    visibility: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ThemeMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    version?: true
    isDefault?: true
    organizationId?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ThemeMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    version?: true
    isDefault?: true
    organizationId?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ThemeCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    themeData?: true
    version?: true
    isDefault?: true
    organizationId?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ThemeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Theme to aggregate.
     */
    where?: ThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Themes to fetch.
     */
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Themes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Themes
    **/
    _count?: true | ThemeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ThemeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ThemeMaxAggregateInputType
  }

  export type GetThemeAggregateType<T extends ThemeAggregateArgs> = {
        [P in keyof T & keyof AggregateTheme]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTheme[P]>
      : GetScalarType<T[P], AggregateTheme[P]>
  }




  export type ThemeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThemeWhereInput
    orderBy?: ThemeOrderByWithAggregationInput | ThemeOrderByWithAggregationInput[]
    by: ThemeScalarFieldEnum[] | ThemeScalarFieldEnum
    having?: ThemeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ThemeCountAggregateInputType | true
    _min?: ThemeMinAggregateInputType
    _max?: ThemeMaxAggregateInputType
  }

  export type ThemeGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    themeData: JsonValue
    version: string
    isDefault: boolean
    organizationId: string | null
    visibility: $Enums.ThemeVisibility
    createdAt: Date
    updatedAt: Date
    _count: ThemeCountAggregateOutputType | null
    _min: ThemeMinAggregateOutputType | null
    _max: ThemeMaxAggregateOutputType | null
  }

  type GetThemeGroupByPayload<T extends ThemeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ThemeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ThemeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ThemeGroupByOutputType[P]>
            : GetScalarType<T[P], ThemeGroupByOutputType[P]>
        }
      >
    >


  export type ThemeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    themeData?: boolean
    version?: boolean
    isDefault?: boolean
    organizationId?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | Theme$organizationArgs<ExtArgs>
    generatedThemes?: boolean | Theme$generatedThemesArgs<ExtArgs>
    sharedWith?: boolean | Theme$sharedWithArgs<ExtArgs>
    _count?: boolean | ThemeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["theme"]>

  export type ThemeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    themeData?: boolean
    version?: boolean
    isDefault?: boolean
    organizationId?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | Theme$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["theme"]>

  export type ThemeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    themeData?: boolean
    version?: boolean
    isDefault?: boolean
    organizationId?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | Theme$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["theme"]>

  export type ThemeSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    themeData?: boolean
    version?: boolean
    isDefault?: boolean
    organizationId?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ThemeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "description" | "themeData" | "version" | "isDefault" | "organizationId" | "visibility" | "createdAt" | "updatedAt", ExtArgs["result"]["theme"]>
  export type ThemeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | Theme$organizationArgs<ExtArgs>
    generatedThemes?: boolean | Theme$generatedThemesArgs<ExtArgs>
    sharedWith?: boolean | Theme$sharedWithArgs<ExtArgs>
    _count?: boolean | ThemeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ThemeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | Theme$organizationArgs<ExtArgs>
  }
  export type ThemeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | Theme$organizationArgs<ExtArgs>
  }

  export type $ThemePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Theme"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      generatedThemes: Prisma.$GeneratedThemePayload<ExtArgs>[]
      sharedWith: Prisma.$ThemeSharePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      themeData: Prisma.JsonValue
      version: string
      isDefault: boolean
      organizationId: string | null
      visibility: $Enums.ThemeVisibility
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["theme"]>
    composites: {}
  }

  type ThemeGetPayload<S extends boolean | null | undefined | ThemeDefaultArgs> = $Result.GetResult<Prisma.$ThemePayload, S>

  type ThemeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ThemeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ThemeCountAggregateInputType | true
    }

  export interface ThemeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Theme'], meta: { name: 'Theme' } }
    /**
     * Find zero or one Theme that matches the filter.
     * @param {ThemeFindUniqueArgs} args - Arguments to find a Theme
     * @example
     * // Get one Theme
     * const theme = await prisma.theme.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ThemeFindUniqueArgs>(args: SelectSubset<T, ThemeFindUniqueArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Theme that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ThemeFindUniqueOrThrowArgs} args - Arguments to find a Theme
     * @example
     * // Get one Theme
     * const theme = await prisma.theme.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ThemeFindUniqueOrThrowArgs>(args: SelectSubset<T, ThemeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Theme that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeFindFirstArgs} args - Arguments to find a Theme
     * @example
     * // Get one Theme
     * const theme = await prisma.theme.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ThemeFindFirstArgs>(args?: SelectSubset<T, ThemeFindFirstArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Theme that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeFindFirstOrThrowArgs} args - Arguments to find a Theme
     * @example
     * // Get one Theme
     * const theme = await prisma.theme.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ThemeFindFirstOrThrowArgs>(args?: SelectSubset<T, ThemeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Themes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Themes
     * const themes = await prisma.theme.findMany()
     * 
     * // Get first 10 Themes
     * const themes = await prisma.theme.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const themeWithIdOnly = await prisma.theme.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ThemeFindManyArgs>(args?: SelectSubset<T, ThemeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Theme.
     * @param {ThemeCreateArgs} args - Arguments to create a Theme.
     * @example
     * // Create one Theme
     * const Theme = await prisma.theme.create({
     *   data: {
     *     // ... data to create a Theme
     *   }
     * })
     * 
     */
    create<T extends ThemeCreateArgs>(args: SelectSubset<T, ThemeCreateArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Themes.
     * @param {ThemeCreateManyArgs} args - Arguments to create many Themes.
     * @example
     * // Create many Themes
     * const theme = await prisma.theme.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ThemeCreateManyArgs>(args?: SelectSubset<T, ThemeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Themes and returns the data saved in the database.
     * @param {ThemeCreateManyAndReturnArgs} args - Arguments to create many Themes.
     * @example
     * // Create many Themes
     * const theme = await prisma.theme.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Themes and only return the `id`
     * const themeWithIdOnly = await prisma.theme.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ThemeCreateManyAndReturnArgs>(args?: SelectSubset<T, ThemeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Theme.
     * @param {ThemeDeleteArgs} args - Arguments to delete one Theme.
     * @example
     * // Delete one Theme
     * const Theme = await prisma.theme.delete({
     *   where: {
     *     // ... filter to delete one Theme
     *   }
     * })
     * 
     */
    delete<T extends ThemeDeleteArgs>(args: SelectSubset<T, ThemeDeleteArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Theme.
     * @param {ThemeUpdateArgs} args - Arguments to update one Theme.
     * @example
     * // Update one Theme
     * const theme = await prisma.theme.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ThemeUpdateArgs>(args: SelectSubset<T, ThemeUpdateArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Themes.
     * @param {ThemeDeleteManyArgs} args - Arguments to filter Themes to delete.
     * @example
     * // Delete a few Themes
     * const { count } = await prisma.theme.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ThemeDeleteManyArgs>(args?: SelectSubset<T, ThemeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Themes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Themes
     * const theme = await prisma.theme.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ThemeUpdateManyArgs>(args: SelectSubset<T, ThemeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Themes and returns the data updated in the database.
     * @param {ThemeUpdateManyAndReturnArgs} args - Arguments to update many Themes.
     * @example
     * // Update many Themes
     * const theme = await prisma.theme.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Themes and only return the `id`
     * const themeWithIdOnly = await prisma.theme.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ThemeUpdateManyAndReturnArgs>(args: SelectSubset<T, ThemeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Theme.
     * @param {ThemeUpsertArgs} args - Arguments to update or create a Theme.
     * @example
     * // Update or create a Theme
     * const theme = await prisma.theme.upsert({
     *   create: {
     *     // ... data to create a Theme
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Theme we want to update
     *   }
     * })
     */
    upsert<T extends ThemeUpsertArgs>(args: SelectSubset<T, ThemeUpsertArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Themes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeCountArgs} args - Arguments to filter Themes to count.
     * @example
     * // Count the number of Themes
     * const count = await prisma.theme.count({
     *   where: {
     *     // ... the filter for the Themes we want to count
     *   }
     * })
    **/
    count<T extends ThemeCountArgs>(
      args?: Subset<T, ThemeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ThemeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Theme.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ThemeAggregateArgs>(args: Subset<T, ThemeAggregateArgs>): Prisma.PrismaPromise<GetThemeAggregateType<T>>

    /**
     * Group by Theme.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ThemeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ThemeGroupByArgs['orderBy'] }
        : { orderBy?: ThemeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ThemeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetThemeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Theme model
   */
  readonly fields: ThemeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Theme.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ThemeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    organization<T extends Theme$organizationArgs<ExtArgs> = {}>(args?: Subset<T, Theme$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    generatedThemes<T extends Theme$generatedThemesArgs<ExtArgs> = {}>(args?: Subset<T, Theme$generatedThemesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneratedThemePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sharedWith<T extends Theme$sharedWithArgs<ExtArgs> = {}>(args?: Subset<T, Theme$sharedWithArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Theme model
   */
  interface ThemeFieldRefs {
    readonly id: FieldRef<"Theme", 'String'>
    readonly userId: FieldRef<"Theme", 'String'>
    readonly name: FieldRef<"Theme", 'String'>
    readonly description: FieldRef<"Theme", 'String'>
    readonly themeData: FieldRef<"Theme", 'Json'>
    readonly version: FieldRef<"Theme", 'String'>
    readonly isDefault: FieldRef<"Theme", 'Boolean'>
    readonly organizationId: FieldRef<"Theme", 'String'>
    readonly visibility: FieldRef<"Theme", 'ThemeVisibility'>
    readonly createdAt: FieldRef<"Theme", 'DateTime'>
    readonly updatedAt: FieldRef<"Theme", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Theme findUnique
   */
  export type ThemeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter, which Theme to fetch.
     */
    where: ThemeWhereUniqueInput
  }

  /**
   * Theme findUniqueOrThrow
   */
  export type ThemeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter, which Theme to fetch.
     */
    where: ThemeWhereUniqueInput
  }

  /**
   * Theme findFirst
   */
  export type ThemeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter, which Theme to fetch.
     */
    where?: ThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Themes to fetch.
     */
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Themes.
     */
    cursor?: ThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Themes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Themes.
     */
    distinct?: ThemeScalarFieldEnum | ThemeScalarFieldEnum[]
  }

  /**
   * Theme findFirstOrThrow
   */
  export type ThemeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter, which Theme to fetch.
     */
    where?: ThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Themes to fetch.
     */
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Themes.
     */
    cursor?: ThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Themes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Themes.
     */
    distinct?: ThemeScalarFieldEnum | ThemeScalarFieldEnum[]
  }

  /**
   * Theme findMany
   */
  export type ThemeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter, which Themes to fetch.
     */
    where?: ThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Themes to fetch.
     */
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Themes.
     */
    cursor?: ThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Themes.
     */
    skip?: number
    distinct?: ThemeScalarFieldEnum | ThemeScalarFieldEnum[]
  }

  /**
   * Theme create
   */
  export type ThemeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * The data needed to create a Theme.
     */
    data: XOR<ThemeCreateInput, ThemeUncheckedCreateInput>
  }

  /**
   * Theme createMany
   */
  export type ThemeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Themes.
     */
    data: ThemeCreateManyInput | ThemeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Theme createManyAndReturn
   */
  export type ThemeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * The data used to create many Themes.
     */
    data: ThemeCreateManyInput | ThemeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Theme update
   */
  export type ThemeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * The data needed to update a Theme.
     */
    data: XOR<ThemeUpdateInput, ThemeUncheckedUpdateInput>
    /**
     * Choose, which Theme to update.
     */
    where: ThemeWhereUniqueInput
  }

  /**
   * Theme updateMany
   */
  export type ThemeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Themes.
     */
    data: XOR<ThemeUpdateManyMutationInput, ThemeUncheckedUpdateManyInput>
    /**
     * Filter which Themes to update
     */
    where?: ThemeWhereInput
    /**
     * Limit how many Themes to update.
     */
    limit?: number
  }

  /**
   * Theme updateManyAndReturn
   */
  export type ThemeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * The data used to update Themes.
     */
    data: XOR<ThemeUpdateManyMutationInput, ThemeUncheckedUpdateManyInput>
    /**
     * Filter which Themes to update
     */
    where?: ThemeWhereInput
    /**
     * Limit how many Themes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Theme upsert
   */
  export type ThemeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * The filter to search for the Theme to update in case it exists.
     */
    where: ThemeWhereUniqueInput
    /**
     * In case the Theme found by the `where` argument doesn't exist, create a new Theme with this data.
     */
    create: XOR<ThemeCreateInput, ThemeUncheckedCreateInput>
    /**
     * In case the Theme was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ThemeUpdateInput, ThemeUncheckedUpdateInput>
  }

  /**
   * Theme delete
   */
  export type ThemeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter which Theme to delete.
     */
    where: ThemeWhereUniqueInput
  }

  /**
   * Theme deleteMany
   */
  export type ThemeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Themes to delete
     */
    where?: ThemeWhereInput
    /**
     * Limit how many Themes to delete.
     */
    limit?: number
  }

  /**
   * Theme.organization
   */
  export type Theme$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * Theme.generatedThemes
   */
  export type Theme$generatedThemesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneratedTheme
     */
    select?: GeneratedThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneratedTheme
     */
    omit?: GeneratedThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneratedThemeInclude<ExtArgs> | null
    where?: GeneratedThemeWhereInput
    orderBy?: GeneratedThemeOrderByWithRelationInput | GeneratedThemeOrderByWithRelationInput[]
    cursor?: GeneratedThemeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GeneratedThemeScalarFieldEnum | GeneratedThemeScalarFieldEnum[]
  }

  /**
   * Theme.sharedWith
   */
  export type Theme$sharedWithArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
    where?: ThemeShareWhereInput
    orderBy?: ThemeShareOrderByWithRelationInput | ThemeShareOrderByWithRelationInput[]
    cursor?: ThemeShareWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ThemeShareScalarFieldEnum | ThemeShareScalarFieldEnum[]
  }

  /**
   * Theme without action
   */
  export type ThemeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    plan: $Enums.UserPlan | null
    stripeCustomerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    plan: $Enums.UserPlan | null
    stripeCustomerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    plan: number
    stripeCustomerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    plan?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    plan?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    plan?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    plan: $Enums.UserPlan
    stripeCustomerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    plan?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    themes?: boolean | User$themesArgs<ExtArgs>
    colorPalettes?: boolean | User$colorPalettesArgs<ExtArgs>
    neutralPalettes?: boolean | User$neutralPalettesArgs<ExtArgs>
    organizationMemberships?: boolean | User$organizationMembershipsArgs<ExtArgs>
    purchase?: boolean | User$purchaseArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    plan?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    plan?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    plan?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "plan" | "stripeCustomerId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    themes?: boolean | User$themesArgs<ExtArgs>
    colorPalettes?: boolean | User$colorPalettesArgs<ExtArgs>
    neutralPalettes?: boolean | User$neutralPalettesArgs<ExtArgs>
    organizationMemberships?: boolean | User$organizationMembershipsArgs<ExtArgs>
    purchase?: boolean | User$purchaseArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      themes: Prisma.$ThemePayload<ExtArgs>[]
      colorPalettes: Prisma.$ColorPalettePayload<ExtArgs>[]
      neutralPalettes: Prisma.$NeutralPalettePayload<ExtArgs>[]
      organizationMemberships: Prisma.$OrganizationMemberPayload<ExtArgs>[]
      purchase: Prisma.$PurchasePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      plan: $Enums.UserPlan
      stripeCustomerId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    themes<T extends User$themesArgs<ExtArgs> = {}>(args?: Subset<T, User$themesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    colorPalettes<T extends User$colorPalettesArgs<ExtArgs> = {}>(args?: Subset<T, User$colorPalettesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorPalettePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    neutralPalettes<T extends User$neutralPalettesArgs<ExtArgs> = {}>(args?: Subset<T, User$neutralPalettesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NeutralPalettePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    organizationMemberships<T extends User$organizationMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$organizationMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    purchase<T extends User$purchaseArgs<ExtArgs> = {}>(args?: Subset<T, User$purchaseArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly plan: FieldRef<"User", 'UserPlan'>
    readonly stripeCustomerId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.themes
   */
  export type User$themesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    where?: ThemeWhereInput
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    cursor?: ThemeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ThemeScalarFieldEnum | ThemeScalarFieldEnum[]
  }

  /**
   * User.colorPalettes
   */
  export type User$colorPalettesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorPalette
     */
    select?: ColorPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColorPalette
     */
    omit?: ColorPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorPaletteInclude<ExtArgs> | null
    where?: ColorPaletteWhereInput
    orderBy?: ColorPaletteOrderByWithRelationInput | ColorPaletteOrderByWithRelationInput[]
    cursor?: ColorPaletteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColorPaletteScalarFieldEnum | ColorPaletteScalarFieldEnum[]
  }

  /**
   * User.neutralPalettes
   */
  export type User$neutralPalettesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeutralPalette
     */
    select?: NeutralPaletteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NeutralPalette
     */
    omit?: NeutralPaletteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NeutralPaletteInclude<ExtArgs> | null
    where?: NeutralPaletteWhereInput
    orderBy?: NeutralPaletteOrderByWithRelationInput | NeutralPaletteOrderByWithRelationInput[]
    cursor?: NeutralPaletteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NeutralPaletteScalarFieldEnum | NeutralPaletteScalarFieldEnum[]
  }

  /**
   * User.organizationMemberships
   */
  export type User$organizationMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    where?: OrganizationMemberWhereInput
    orderBy?: OrganizationMemberOrderByWithRelationInput | OrganizationMemberOrderByWithRelationInput[]
    cursor?: OrganizationMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationMemberScalarFieldEnum | OrganizationMemberScalarFieldEnum[]
  }

  /**
   * User.purchase
   */
  export type User$purchaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    where?: PurchaseWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationAvgAggregateOutputType = {
    seats: number | null
  }

  export type OrganizationSumAggregateOutputType = {
    seats: number | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    clerkOrgId: string | null
    name: string | null
    seats: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    clerkOrgId: string | null
    name: string | null
    seats: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    clerkOrgId: number
    name: number
    seats: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationAvgAggregateInputType = {
    seats?: true
  }

  export type OrganizationSumAggregateInputType = {
    seats?: true
  }

  export type OrganizationMinAggregateInputType = {
    id?: true
    clerkOrgId?: true
    name?: true
    seats?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    clerkOrgId?: true
    name?: true
    seats?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    clerkOrgId?: true
    name?: true
    seats?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrganizationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrganizationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _avg?: OrganizationAvgAggregateInputType
    _sum?: OrganizationSumAggregateInputType
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    clerkOrgId: string
    name: string
    seats: number
    createdAt: Date
    updatedAt: Date
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkOrgId?: boolean
    name?: boolean
    seats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    members?: boolean | Organization$membersArgs<ExtArgs>
    themes?: boolean | Organization$themesArgs<ExtArgs>
    purchase?: boolean | Organization$purchaseArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkOrgId?: boolean
    name?: boolean
    seats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkOrgId?: boolean
    name?: boolean
    seats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    clerkOrgId?: boolean
    name?: boolean
    seats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkOrgId" | "name" | "seats" | "createdAt" | "updatedAt", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Organization$membersArgs<ExtArgs>
    themes?: boolean | Organization$themesArgs<ExtArgs>
    purchase?: boolean | Organization$purchaseArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      members: Prisma.$OrganizationMemberPayload<ExtArgs>[]
      themes: Prisma.$ThemePayload<ExtArgs>[]
      purchase: Prisma.$PurchasePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkOrgId: string
      name: string
      seats: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Organization$membersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    themes<T extends Organization$themesArgs<ExtArgs> = {}>(args?: Subset<T, Organization$themesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    purchase<T extends Organization$purchaseArgs<ExtArgs> = {}>(args?: Subset<T, Organization$purchaseArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly clerkOrgId: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly seats: FieldRef<"Organization", 'Int'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.members
   */
  export type Organization$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    where?: OrganizationMemberWhereInput
    orderBy?: OrganizationMemberOrderByWithRelationInput | OrganizationMemberOrderByWithRelationInput[]
    cursor?: OrganizationMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationMemberScalarFieldEnum | OrganizationMemberScalarFieldEnum[]
  }

  /**
   * Organization.themes
   */
  export type Organization$themesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    where?: ThemeWhereInput
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    cursor?: ThemeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ThemeScalarFieldEnum | ThemeScalarFieldEnum[]
  }

  /**
   * Organization.purchase
   */
  export type Organization$purchaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    where?: PurchaseWhereInput
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model OrganizationMember
   */

  export type AggregateOrganizationMember = {
    _count: OrganizationMemberCountAggregateOutputType | null
    _min: OrganizationMemberMinAggregateOutputType | null
    _max: OrganizationMemberMaxAggregateOutputType | null
  }

  export type OrganizationMemberMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    userId: string | null
    role: $Enums.OrganizationRole | null
    createdAt: Date | null
  }

  export type OrganizationMemberMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    userId: string | null
    role: $Enums.OrganizationRole | null
    createdAt: Date | null
  }

  export type OrganizationMemberCountAggregateOutputType = {
    id: number
    organizationId: number
    userId: number
    role: number
    createdAt: number
    _all: number
  }


  export type OrganizationMemberMinAggregateInputType = {
    id?: true
    organizationId?: true
    userId?: true
    role?: true
    createdAt?: true
  }

  export type OrganizationMemberMaxAggregateInputType = {
    id?: true
    organizationId?: true
    userId?: true
    role?: true
    createdAt?: true
  }

  export type OrganizationMemberCountAggregateInputType = {
    id?: true
    organizationId?: true
    userId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type OrganizationMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationMember to aggregate.
     */
    where?: OrganizationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationMembers to fetch.
     */
    orderBy?: OrganizationMemberOrderByWithRelationInput | OrganizationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationMembers
    **/
    _count?: true | OrganizationMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMemberMaxAggregateInputType
  }

  export type GetOrganizationMemberAggregateType<T extends OrganizationMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationMember[P]>
      : GetScalarType<T[P], AggregateOrganizationMember[P]>
  }




  export type OrganizationMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationMemberWhereInput
    orderBy?: OrganizationMemberOrderByWithAggregationInput | OrganizationMemberOrderByWithAggregationInput[]
    by: OrganizationMemberScalarFieldEnum[] | OrganizationMemberScalarFieldEnum
    having?: OrganizationMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationMemberCountAggregateInputType | true
    _min?: OrganizationMemberMinAggregateInputType
    _max?: OrganizationMemberMaxAggregateInputType
  }

  export type OrganizationMemberGroupByOutputType = {
    id: string
    organizationId: string
    userId: string
    role: $Enums.OrganizationRole
    createdAt: Date
    _count: OrganizationMemberCountAggregateOutputType | null
    _min: OrganizationMemberMinAggregateOutputType | null
    _max: OrganizationMemberMaxAggregateOutputType | null
  }

  type GetOrganizationMemberGroupByPayload<T extends OrganizationMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationMemberGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationMemberGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationMember"]>

  export type OrganizationMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationMember"]>

  export type OrganizationMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationMember"]>

  export type OrganizationMemberSelectScalar = {
    id?: boolean
    organizationId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type OrganizationMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "userId" | "role" | "createdAt", ExtArgs["result"]["organizationMember"]>
  export type OrganizationMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OrganizationMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OrganizationMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OrganizationMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationMember"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      userId: string
      role: $Enums.OrganizationRole
      createdAt: Date
    }, ExtArgs["result"]["organizationMember"]>
    composites: {}
  }

  type OrganizationMemberGetPayload<S extends boolean | null | undefined | OrganizationMemberDefaultArgs> = $Result.GetResult<Prisma.$OrganizationMemberPayload, S>

  type OrganizationMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationMemberCountAggregateInputType | true
    }

  export interface OrganizationMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationMember'], meta: { name: 'OrganizationMember' } }
    /**
     * Find zero or one OrganizationMember that matches the filter.
     * @param {OrganizationMemberFindUniqueArgs} args - Arguments to find a OrganizationMember
     * @example
     * // Get one OrganizationMember
     * const organizationMember = await prisma.organizationMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationMemberFindUniqueArgs>(args: SelectSubset<T, OrganizationMemberFindUniqueArgs<ExtArgs>>): Prisma__OrganizationMemberClient<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrganizationMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationMemberFindUniqueOrThrowArgs} args - Arguments to find a OrganizationMember
     * @example
     * // Get one OrganizationMember
     * const organizationMember = await prisma.organizationMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationMemberClient<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberFindFirstArgs} args - Arguments to find a OrganizationMember
     * @example
     * // Get one OrganizationMember
     * const organizationMember = await prisma.organizationMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationMemberFindFirstArgs>(args?: SelectSubset<T, OrganizationMemberFindFirstArgs<ExtArgs>>): Prisma__OrganizationMemberClient<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberFindFirstOrThrowArgs} args - Arguments to find a OrganizationMember
     * @example
     * // Get one OrganizationMember
     * const organizationMember = await prisma.organizationMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationMemberClient<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrganizationMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationMembers
     * const organizationMembers = await prisma.organizationMember.findMany()
     * 
     * // Get first 10 OrganizationMembers
     * const organizationMembers = await prisma.organizationMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationMemberWithIdOnly = await prisma.organizationMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationMemberFindManyArgs>(args?: SelectSubset<T, OrganizationMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrganizationMember.
     * @param {OrganizationMemberCreateArgs} args - Arguments to create a OrganizationMember.
     * @example
     * // Create one OrganizationMember
     * const OrganizationMember = await prisma.organizationMember.create({
     *   data: {
     *     // ... data to create a OrganizationMember
     *   }
     * })
     * 
     */
    create<T extends OrganizationMemberCreateArgs>(args: SelectSubset<T, OrganizationMemberCreateArgs<ExtArgs>>): Prisma__OrganizationMemberClient<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrganizationMembers.
     * @param {OrganizationMemberCreateManyArgs} args - Arguments to create many OrganizationMembers.
     * @example
     * // Create many OrganizationMembers
     * const organizationMember = await prisma.organizationMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationMemberCreateManyArgs>(args?: SelectSubset<T, OrganizationMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrganizationMembers and returns the data saved in the database.
     * @param {OrganizationMemberCreateManyAndReturnArgs} args - Arguments to create many OrganizationMembers.
     * @example
     * // Create many OrganizationMembers
     * const organizationMember = await prisma.organizationMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrganizationMembers and only return the `id`
     * const organizationMemberWithIdOnly = await prisma.organizationMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrganizationMember.
     * @param {OrganizationMemberDeleteArgs} args - Arguments to delete one OrganizationMember.
     * @example
     * // Delete one OrganizationMember
     * const OrganizationMember = await prisma.organizationMember.delete({
     *   where: {
     *     // ... filter to delete one OrganizationMember
     *   }
     * })
     * 
     */
    delete<T extends OrganizationMemberDeleteArgs>(args: SelectSubset<T, OrganizationMemberDeleteArgs<ExtArgs>>): Prisma__OrganizationMemberClient<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrganizationMember.
     * @param {OrganizationMemberUpdateArgs} args - Arguments to update one OrganizationMember.
     * @example
     * // Update one OrganizationMember
     * const organizationMember = await prisma.organizationMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationMemberUpdateArgs>(args: SelectSubset<T, OrganizationMemberUpdateArgs<ExtArgs>>): Prisma__OrganizationMemberClient<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrganizationMembers.
     * @param {OrganizationMemberDeleteManyArgs} args - Arguments to filter OrganizationMembers to delete.
     * @example
     * // Delete a few OrganizationMembers
     * const { count } = await prisma.organizationMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationMemberDeleteManyArgs>(args?: SelectSubset<T, OrganizationMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationMembers
     * const organizationMember = await prisma.organizationMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationMemberUpdateManyArgs>(args: SelectSubset<T, OrganizationMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationMembers and returns the data updated in the database.
     * @param {OrganizationMemberUpdateManyAndReturnArgs} args - Arguments to update many OrganizationMembers.
     * @example
     * // Update many OrganizationMembers
     * const organizationMember = await prisma.organizationMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrganizationMembers and only return the `id`
     * const organizationMemberWithIdOnly = await prisma.organizationMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrganizationMember.
     * @param {OrganizationMemberUpsertArgs} args - Arguments to update or create a OrganizationMember.
     * @example
     * // Update or create a OrganizationMember
     * const organizationMember = await prisma.organizationMember.upsert({
     *   create: {
     *     // ... data to create a OrganizationMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationMember we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationMemberUpsertArgs>(args: SelectSubset<T, OrganizationMemberUpsertArgs<ExtArgs>>): Prisma__OrganizationMemberClient<$Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrganizationMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberCountArgs} args - Arguments to filter OrganizationMembers to count.
     * @example
     * // Count the number of OrganizationMembers
     * const count = await prisma.organizationMember.count({
     *   where: {
     *     // ... the filter for the OrganizationMembers we want to count
     *   }
     * })
    **/
    count<T extends OrganizationMemberCountArgs>(
      args?: Subset<T, OrganizationMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationMemberAggregateArgs>(args: Subset<T, OrganizationMemberAggregateArgs>): Prisma.PrismaPromise<GetOrganizationMemberAggregateType<T>>

    /**
     * Group by OrganizationMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationMemberGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationMember model
   */
  readonly fields: OrganizationMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrganizationMember model
   */
  interface OrganizationMemberFieldRefs {
    readonly id: FieldRef<"OrganizationMember", 'String'>
    readonly organizationId: FieldRef<"OrganizationMember", 'String'>
    readonly userId: FieldRef<"OrganizationMember", 'String'>
    readonly role: FieldRef<"OrganizationMember", 'OrganizationRole'>
    readonly createdAt: FieldRef<"OrganizationMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationMember findUnique
   */
  export type OrganizationMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationMember to fetch.
     */
    where: OrganizationMemberWhereUniqueInput
  }

  /**
   * OrganizationMember findUniqueOrThrow
   */
  export type OrganizationMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationMember to fetch.
     */
    where: OrganizationMemberWhereUniqueInput
  }

  /**
   * OrganizationMember findFirst
   */
  export type OrganizationMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationMember to fetch.
     */
    where?: OrganizationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationMembers to fetch.
     */
    orderBy?: OrganizationMemberOrderByWithRelationInput | OrganizationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationMembers.
     */
    cursor?: OrganizationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationMembers.
     */
    distinct?: OrganizationMemberScalarFieldEnum | OrganizationMemberScalarFieldEnum[]
  }

  /**
   * OrganizationMember findFirstOrThrow
   */
  export type OrganizationMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationMember to fetch.
     */
    where?: OrganizationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationMembers to fetch.
     */
    orderBy?: OrganizationMemberOrderByWithRelationInput | OrganizationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationMembers.
     */
    cursor?: OrganizationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationMembers.
     */
    distinct?: OrganizationMemberScalarFieldEnum | OrganizationMemberScalarFieldEnum[]
  }

  /**
   * OrganizationMember findMany
   */
  export type OrganizationMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationMembers to fetch.
     */
    where?: OrganizationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationMembers to fetch.
     */
    orderBy?: OrganizationMemberOrderByWithRelationInput | OrganizationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationMembers.
     */
    cursor?: OrganizationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationMembers.
     */
    skip?: number
    distinct?: OrganizationMemberScalarFieldEnum | OrganizationMemberScalarFieldEnum[]
  }

  /**
   * OrganizationMember create
   */
  export type OrganizationMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationMember.
     */
    data: XOR<OrganizationMemberCreateInput, OrganizationMemberUncheckedCreateInput>
  }

  /**
   * OrganizationMember createMany
   */
  export type OrganizationMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationMembers.
     */
    data: OrganizationMemberCreateManyInput | OrganizationMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationMember createManyAndReturn
   */
  export type OrganizationMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * The data used to create many OrganizationMembers.
     */
    data: OrganizationMemberCreateManyInput | OrganizationMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationMember update
   */
  export type OrganizationMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationMember.
     */
    data: XOR<OrganizationMemberUpdateInput, OrganizationMemberUncheckedUpdateInput>
    /**
     * Choose, which OrganizationMember to update.
     */
    where: OrganizationMemberWhereUniqueInput
  }

  /**
   * OrganizationMember updateMany
   */
  export type OrganizationMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationMembers.
     */
    data: XOR<OrganizationMemberUpdateManyMutationInput, OrganizationMemberUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationMembers to update
     */
    where?: OrganizationMemberWhereInput
    /**
     * Limit how many OrganizationMembers to update.
     */
    limit?: number
  }

  /**
   * OrganizationMember updateManyAndReturn
   */
  export type OrganizationMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * The data used to update OrganizationMembers.
     */
    data: XOR<OrganizationMemberUpdateManyMutationInput, OrganizationMemberUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationMembers to update
     */
    where?: OrganizationMemberWhereInput
    /**
     * Limit how many OrganizationMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationMember upsert
   */
  export type OrganizationMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationMember to update in case it exists.
     */
    where: OrganizationMemberWhereUniqueInput
    /**
     * In case the OrganizationMember found by the `where` argument doesn't exist, create a new OrganizationMember with this data.
     */
    create: XOR<OrganizationMemberCreateInput, OrganizationMemberUncheckedCreateInput>
    /**
     * In case the OrganizationMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationMemberUpdateInput, OrganizationMemberUncheckedUpdateInput>
  }

  /**
   * OrganizationMember delete
   */
  export type OrganizationMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
    /**
     * Filter which OrganizationMember to delete.
     */
    where: OrganizationMemberWhereUniqueInput
  }

  /**
   * OrganizationMember deleteMany
   */
  export type OrganizationMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationMembers to delete
     */
    where?: OrganizationMemberWhereInput
    /**
     * Limit how many OrganizationMembers to delete.
     */
    limit?: number
  }

  /**
   * OrganizationMember without action
   */
  export type OrganizationMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationMember
     */
    select?: OrganizationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationMember
     */
    omit?: OrganizationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationMemberInclude<ExtArgs> | null
  }


  /**
   * Model Purchase
   */

  export type AggregatePurchase = {
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  export type PurchaseAvgAggregateOutputType = {
    amount: number | null
    seats: number | null
  }

  export type PurchaseSumAggregateOutputType = {
    amount: number | null
    seats: number | null
  }

  export type PurchaseMinAggregateOutputType = {
    id: string | null
    userId: string | null
    organizationId: string | null
    stripeCustomerId: string | null
    stripePaymentId: string | null
    stripePriceId: string | null
    amount: number | null
    currency: string | null
    plan: $Enums.PurchasePlan | null
    seats: number | null
    status: $Enums.PurchaseStatus | null
    createdAt: Date | null
  }

  export type PurchaseMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    organizationId: string | null
    stripeCustomerId: string | null
    stripePaymentId: string | null
    stripePriceId: string | null
    amount: number | null
    currency: string | null
    plan: $Enums.PurchasePlan | null
    seats: number | null
    status: $Enums.PurchaseStatus | null
    createdAt: Date | null
  }

  export type PurchaseCountAggregateOutputType = {
    id: number
    userId: number
    organizationId: number
    stripeCustomerId: number
    stripePaymentId: number
    stripePriceId: number
    amount: number
    currency: number
    plan: number
    seats: number
    status: number
    createdAt: number
    _all: number
  }


  export type PurchaseAvgAggregateInputType = {
    amount?: true
    seats?: true
  }

  export type PurchaseSumAggregateInputType = {
    amount?: true
    seats?: true
  }

  export type PurchaseMinAggregateInputType = {
    id?: true
    userId?: true
    organizationId?: true
    stripeCustomerId?: true
    stripePaymentId?: true
    stripePriceId?: true
    amount?: true
    currency?: true
    plan?: true
    seats?: true
    status?: true
    createdAt?: true
  }

  export type PurchaseMaxAggregateInputType = {
    id?: true
    userId?: true
    organizationId?: true
    stripeCustomerId?: true
    stripePaymentId?: true
    stripePriceId?: true
    amount?: true
    currency?: true
    plan?: true
    seats?: true
    status?: true
    createdAt?: true
  }

  export type PurchaseCountAggregateInputType = {
    id?: true
    userId?: true
    organizationId?: true
    stripeCustomerId?: true
    stripePaymentId?: true
    stripePriceId?: true
    amount?: true
    currency?: true
    plan?: true
    seats?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type PurchaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Purchase to aggregate.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Purchases
    **/
    _count?: true | PurchaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseMaxAggregateInputType
  }

  export type GetPurchaseAggregateType<T extends PurchaseAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchase[P]>
      : GetScalarType<T[P], AggregatePurchase[P]>
  }




  export type PurchaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseWhereInput
    orderBy?: PurchaseOrderByWithAggregationInput | PurchaseOrderByWithAggregationInput[]
    by: PurchaseScalarFieldEnum[] | PurchaseScalarFieldEnum
    having?: PurchaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseCountAggregateInputType | true
    _avg?: PurchaseAvgAggregateInputType
    _sum?: PurchaseSumAggregateInputType
    _min?: PurchaseMinAggregateInputType
    _max?: PurchaseMaxAggregateInputType
  }

  export type PurchaseGroupByOutputType = {
    id: string
    userId: string | null
    organizationId: string | null
    stripeCustomerId: string
    stripePaymentId: string
    stripePriceId: string
    amount: number
    currency: string
    plan: $Enums.PurchasePlan
    seats: number | null
    status: $Enums.PurchaseStatus
    createdAt: Date
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  type GetPurchaseGroupByPayload<T extends PurchaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
        }
      >
    >


  export type PurchaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    organizationId?: boolean
    stripeCustomerId?: boolean
    stripePaymentId?: boolean
    stripePriceId?: boolean
    amount?: boolean
    currency?: boolean
    plan?: boolean
    seats?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | Purchase$userArgs<ExtArgs>
    organization?: boolean | Purchase$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["purchase"]>

  export type PurchaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    organizationId?: boolean
    stripeCustomerId?: boolean
    stripePaymentId?: boolean
    stripePriceId?: boolean
    amount?: boolean
    currency?: boolean
    plan?: boolean
    seats?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | Purchase$userArgs<ExtArgs>
    organization?: boolean | Purchase$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["purchase"]>

  export type PurchaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    organizationId?: boolean
    stripeCustomerId?: boolean
    stripePaymentId?: boolean
    stripePriceId?: boolean
    amount?: boolean
    currency?: boolean
    plan?: boolean
    seats?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | Purchase$userArgs<ExtArgs>
    organization?: boolean | Purchase$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["purchase"]>

  export type PurchaseSelectScalar = {
    id?: boolean
    userId?: boolean
    organizationId?: boolean
    stripeCustomerId?: boolean
    stripePaymentId?: boolean
    stripePriceId?: boolean
    amount?: boolean
    currency?: boolean
    plan?: boolean
    seats?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type PurchaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "organizationId" | "stripeCustomerId" | "stripePaymentId" | "stripePriceId" | "amount" | "currency" | "plan" | "seats" | "status" | "createdAt", ExtArgs["result"]["purchase"]>
  export type PurchaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Purchase$userArgs<ExtArgs>
    organization?: boolean | Purchase$organizationArgs<ExtArgs>
  }
  export type PurchaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Purchase$userArgs<ExtArgs>
    organization?: boolean | Purchase$organizationArgs<ExtArgs>
  }
  export type PurchaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Purchase$userArgs<ExtArgs>
    organization?: boolean | Purchase$organizationArgs<ExtArgs>
  }

  export type $PurchasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Purchase"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      organizationId: string | null
      stripeCustomerId: string
      stripePaymentId: string
      stripePriceId: string
      amount: number
      currency: string
      plan: $Enums.PurchasePlan
      seats: number | null
      status: $Enums.PurchaseStatus
      createdAt: Date
    }, ExtArgs["result"]["purchase"]>
    composites: {}
  }

  type PurchaseGetPayload<S extends boolean | null | undefined | PurchaseDefaultArgs> = $Result.GetResult<Prisma.$PurchasePayload, S>

  type PurchaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PurchaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PurchaseCountAggregateInputType | true
    }

  export interface PurchaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Purchase'], meta: { name: 'Purchase' } }
    /**
     * Find zero or one Purchase that matches the filter.
     * @param {PurchaseFindUniqueArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurchaseFindUniqueArgs>(args: SelectSubset<T, PurchaseFindUniqueArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Purchase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PurchaseFindUniqueOrThrowArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurchaseFindUniqueOrThrowArgs>(args: SelectSubset<T, PurchaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Purchase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindFirstArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurchaseFindFirstArgs>(args?: SelectSubset<T, PurchaseFindFirstArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Purchase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindFirstOrThrowArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurchaseFindFirstOrThrowArgs>(args?: SelectSubset<T, PurchaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Purchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Purchases
     * const purchases = await prisma.purchase.findMany()
     * 
     * // Get first 10 Purchases
     * const purchases = await prisma.purchase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseWithIdOnly = await prisma.purchase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurchaseFindManyArgs>(args?: SelectSubset<T, PurchaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Purchase.
     * @param {PurchaseCreateArgs} args - Arguments to create a Purchase.
     * @example
     * // Create one Purchase
     * const Purchase = await prisma.purchase.create({
     *   data: {
     *     // ... data to create a Purchase
     *   }
     * })
     * 
     */
    create<T extends PurchaseCreateArgs>(args: SelectSubset<T, PurchaseCreateArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Purchases.
     * @param {PurchaseCreateManyArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchase = await prisma.purchase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurchaseCreateManyArgs>(args?: SelectSubset<T, PurchaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Purchases and returns the data saved in the database.
     * @param {PurchaseCreateManyAndReturnArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchase = await prisma.purchase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Purchases and only return the `id`
     * const purchaseWithIdOnly = await prisma.purchase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PurchaseCreateManyAndReturnArgs>(args?: SelectSubset<T, PurchaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Purchase.
     * @param {PurchaseDeleteArgs} args - Arguments to delete one Purchase.
     * @example
     * // Delete one Purchase
     * const Purchase = await prisma.purchase.delete({
     *   where: {
     *     // ... filter to delete one Purchase
     *   }
     * })
     * 
     */
    delete<T extends PurchaseDeleteArgs>(args: SelectSubset<T, PurchaseDeleteArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Purchase.
     * @param {PurchaseUpdateArgs} args - Arguments to update one Purchase.
     * @example
     * // Update one Purchase
     * const purchase = await prisma.purchase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurchaseUpdateArgs>(args: SelectSubset<T, PurchaseUpdateArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Purchases.
     * @param {PurchaseDeleteManyArgs} args - Arguments to filter Purchases to delete.
     * @example
     * // Delete a few Purchases
     * const { count } = await prisma.purchase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurchaseDeleteManyArgs>(args?: SelectSubset<T, PurchaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Purchases
     * const purchase = await prisma.purchase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurchaseUpdateManyArgs>(args: SelectSubset<T, PurchaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases and returns the data updated in the database.
     * @param {PurchaseUpdateManyAndReturnArgs} args - Arguments to update many Purchases.
     * @example
     * // Update many Purchases
     * const purchase = await prisma.purchase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Purchases and only return the `id`
     * const purchaseWithIdOnly = await prisma.purchase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PurchaseUpdateManyAndReturnArgs>(args: SelectSubset<T, PurchaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Purchase.
     * @param {PurchaseUpsertArgs} args - Arguments to update or create a Purchase.
     * @example
     * // Update or create a Purchase
     * const purchase = await prisma.purchase.upsert({
     *   create: {
     *     // ... data to create a Purchase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Purchase we want to update
     *   }
     * })
     */
    upsert<T extends PurchaseUpsertArgs>(args: SelectSubset<T, PurchaseUpsertArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseCountArgs} args - Arguments to filter Purchases to count.
     * @example
     * // Count the number of Purchases
     * const count = await prisma.purchase.count({
     *   where: {
     *     // ... the filter for the Purchases we want to count
     *   }
     * })
    **/
    count<T extends PurchaseCountArgs>(
      args?: Subset<T, PurchaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchaseAggregateArgs>(args: Subset<T, PurchaseAggregateArgs>): Prisma.PrismaPromise<GetPurchaseAggregateType<T>>

    /**
     * Group by Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PurchaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PurchaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Purchase model
   */
  readonly fields: PurchaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Purchase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurchaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Purchase$userArgs<ExtArgs> = {}>(args?: Subset<T, Purchase$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    organization<T extends Purchase$organizationArgs<ExtArgs> = {}>(args?: Subset<T, Purchase$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Purchase model
   */
  interface PurchaseFieldRefs {
    readonly id: FieldRef<"Purchase", 'String'>
    readonly userId: FieldRef<"Purchase", 'String'>
    readonly organizationId: FieldRef<"Purchase", 'String'>
    readonly stripeCustomerId: FieldRef<"Purchase", 'String'>
    readonly stripePaymentId: FieldRef<"Purchase", 'String'>
    readonly stripePriceId: FieldRef<"Purchase", 'String'>
    readonly amount: FieldRef<"Purchase", 'Int'>
    readonly currency: FieldRef<"Purchase", 'String'>
    readonly plan: FieldRef<"Purchase", 'PurchasePlan'>
    readonly seats: FieldRef<"Purchase", 'Int'>
    readonly status: FieldRef<"Purchase", 'PurchaseStatus'>
    readonly createdAt: FieldRef<"Purchase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Purchase findUnique
   */
  export type PurchaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase findUniqueOrThrow
   */
  export type PurchaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase findFirst
   */
  export type PurchaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase findFirstOrThrow
   */
  export type PurchaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase findMany
   */
  export type PurchaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchases to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase create
   */
  export type PurchaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Purchase.
     */
    data: XOR<PurchaseCreateInput, PurchaseUncheckedCreateInput>
  }

  /**
   * Purchase createMany
   */
  export type PurchaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Purchases.
     */
    data: PurchaseCreateManyInput | PurchaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Purchase createManyAndReturn
   */
  export type PurchaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * The data used to create many Purchases.
     */
    data: PurchaseCreateManyInput | PurchaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Purchase update
   */
  export type PurchaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Purchase.
     */
    data: XOR<PurchaseUpdateInput, PurchaseUncheckedUpdateInput>
    /**
     * Choose, which Purchase to update.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase updateMany
   */
  export type PurchaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Purchases.
     */
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyInput>
    /**
     * Filter which Purchases to update
     */
    where?: PurchaseWhereInput
    /**
     * Limit how many Purchases to update.
     */
    limit?: number
  }

  /**
   * Purchase updateManyAndReturn
   */
  export type PurchaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * The data used to update Purchases.
     */
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyInput>
    /**
     * Filter which Purchases to update
     */
    where?: PurchaseWhereInput
    /**
     * Limit how many Purchases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Purchase upsert
   */
  export type PurchaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Purchase to update in case it exists.
     */
    where: PurchaseWhereUniqueInput
    /**
     * In case the Purchase found by the `where` argument doesn't exist, create a new Purchase with this data.
     */
    create: XOR<PurchaseCreateInput, PurchaseUncheckedCreateInput>
    /**
     * In case the Purchase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurchaseUpdateInput, PurchaseUncheckedUpdateInput>
  }

  /**
   * Purchase delete
   */
  export type PurchaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter which Purchase to delete.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase deleteMany
   */
  export type PurchaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Purchases to delete
     */
    where?: PurchaseWhereInput
    /**
     * Limit how many Purchases to delete.
     */
    limit?: number
  }

  /**
   * Purchase.user
   */
  export type Purchase$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Purchase.organization
   */
  export type Purchase$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * Purchase without action
   */
  export type PurchaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
  }


  /**
   * Model ThemeShare
   */

  export type AggregateThemeShare = {
    _count: ThemeShareCountAggregateOutputType | null
    _min: ThemeShareMinAggregateOutputType | null
    _max: ThemeShareMaxAggregateOutputType | null
  }

  export type ThemeShareMinAggregateOutputType = {
    id: string | null
    themeId: string | null
    sharedBy: string | null
    sharedWith: string | null
    createdAt: Date | null
  }

  export type ThemeShareMaxAggregateOutputType = {
    id: string | null
    themeId: string | null
    sharedBy: string | null
    sharedWith: string | null
    createdAt: Date | null
  }

  export type ThemeShareCountAggregateOutputType = {
    id: number
    themeId: number
    sharedBy: number
    sharedWith: number
    createdAt: number
    _all: number
  }


  export type ThemeShareMinAggregateInputType = {
    id?: true
    themeId?: true
    sharedBy?: true
    sharedWith?: true
    createdAt?: true
  }

  export type ThemeShareMaxAggregateInputType = {
    id?: true
    themeId?: true
    sharedBy?: true
    sharedWith?: true
    createdAt?: true
  }

  export type ThemeShareCountAggregateInputType = {
    id?: true
    themeId?: true
    sharedBy?: true
    sharedWith?: true
    createdAt?: true
    _all?: true
  }

  export type ThemeShareAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ThemeShare to aggregate.
     */
    where?: ThemeShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThemeShares to fetch.
     */
    orderBy?: ThemeShareOrderByWithRelationInput | ThemeShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ThemeShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThemeShares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThemeShares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ThemeShares
    **/
    _count?: true | ThemeShareCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ThemeShareMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ThemeShareMaxAggregateInputType
  }

  export type GetThemeShareAggregateType<T extends ThemeShareAggregateArgs> = {
        [P in keyof T & keyof AggregateThemeShare]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateThemeShare[P]>
      : GetScalarType<T[P], AggregateThemeShare[P]>
  }




  export type ThemeShareGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThemeShareWhereInput
    orderBy?: ThemeShareOrderByWithAggregationInput | ThemeShareOrderByWithAggregationInput[]
    by: ThemeShareScalarFieldEnum[] | ThemeShareScalarFieldEnum
    having?: ThemeShareScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ThemeShareCountAggregateInputType | true
    _min?: ThemeShareMinAggregateInputType
    _max?: ThemeShareMaxAggregateInputType
  }

  export type ThemeShareGroupByOutputType = {
    id: string
    themeId: string
    sharedBy: string
    sharedWith: string
    createdAt: Date
    _count: ThemeShareCountAggregateOutputType | null
    _min: ThemeShareMinAggregateOutputType | null
    _max: ThemeShareMaxAggregateOutputType | null
  }

  type GetThemeShareGroupByPayload<T extends ThemeShareGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ThemeShareGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ThemeShareGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ThemeShareGroupByOutputType[P]>
            : GetScalarType<T[P], ThemeShareGroupByOutputType[P]>
        }
      >
    >


  export type ThemeShareSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    themeId?: boolean
    sharedBy?: boolean
    sharedWith?: boolean
    createdAt?: boolean
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["themeShare"]>

  export type ThemeShareSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    themeId?: boolean
    sharedBy?: boolean
    sharedWith?: boolean
    createdAt?: boolean
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["themeShare"]>

  export type ThemeShareSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    themeId?: boolean
    sharedBy?: boolean
    sharedWith?: boolean
    createdAt?: boolean
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["themeShare"]>

  export type ThemeShareSelectScalar = {
    id?: boolean
    themeId?: boolean
    sharedBy?: boolean
    sharedWith?: boolean
    createdAt?: boolean
  }

  export type ThemeShareOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "themeId" | "sharedBy" | "sharedWith" | "createdAt", ExtArgs["result"]["themeShare"]>
  export type ThemeShareInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }
  export type ThemeShareIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }
  export type ThemeShareIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    theme?: boolean | ThemeDefaultArgs<ExtArgs>
  }

  export type $ThemeSharePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ThemeShare"
    objects: {
      theme: Prisma.$ThemePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      themeId: string
      sharedBy: string
      sharedWith: string
      createdAt: Date
    }, ExtArgs["result"]["themeShare"]>
    composites: {}
  }

  type ThemeShareGetPayload<S extends boolean | null | undefined | ThemeShareDefaultArgs> = $Result.GetResult<Prisma.$ThemeSharePayload, S>

  type ThemeShareCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ThemeShareFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ThemeShareCountAggregateInputType | true
    }

  export interface ThemeShareDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ThemeShare'], meta: { name: 'ThemeShare' } }
    /**
     * Find zero or one ThemeShare that matches the filter.
     * @param {ThemeShareFindUniqueArgs} args - Arguments to find a ThemeShare
     * @example
     * // Get one ThemeShare
     * const themeShare = await prisma.themeShare.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ThemeShareFindUniqueArgs>(args: SelectSubset<T, ThemeShareFindUniqueArgs<ExtArgs>>): Prisma__ThemeShareClient<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ThemeShare that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ThemeShareFindUniqueOrThrowArgs} args - Arguments to find a ThemeShare
     * @example
     * // Get one ThemeShare
     * const themeShare = await prisma.themeShare.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ThemeShareFindUniqueOrThrowArgs>(args: SelectSubset<T, ThemeShareFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ThemeShareClient<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ThemeShare that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeShareFindFirstArgs} args - Arguments to find a ThemeShare
     * @example
     * // Get one ThemeShare
     * const themeShare = await prisma.themeShare.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ThemeShareFindFirstArgs>(args?: SelectSubset<T, ThemeShareFindFirstArgs<ExtArgs>>): Prisma__ThemeShareClient<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ThemeShare that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeShareFindFirstOrThrowArgs} args - Arguments to find a ThemeShare
     * @example
     * // Get one ThemeShare
     * const themeShare = await prisma.themeShare.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ThemeShareFindFirstOrThrowArgs>(args?: SelectSubset<T, ThemeShareFindFirstOrThrowArgs<ExtArgs>>): Prisma__ThemeShareClient<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ThemeShares that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeShareFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ThemeShares
     * const themeShares = await prisma.themeShare.findMany()
     * 
     * // Get first 10 ThemeShares
     * const themeShares = await prisma.themeShare.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const themeShareWithIdOnly = await prisma.themeShare.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ThemeShareFindManyArgs>(args?: SelectSubset<T, ThemeShareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ThemeShare.
     * @param {ThemeShareCreateArgs} args - Arguments to create a ThemeShare.
     * @example
     * // Create one ThemeShare
     * const ThemeShare = await prisma.themeShare.create({
     *   data: {
     *     // ... data to create a ThemeShare
     *   }
     * })
     * 
     */
    create<T extends ThemeShareCreateArgs>(args: SelectSubset<T, ThemeShareCreateArgs<ExtArgs>>): Prisma__ThemeShareClient<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ThemeShares.
     * @param {ThemeShareCreateManyArgs} args - Arguments to create many ThemeShares.
     * @example
     * // Create many ThemeShares
     * const themeShare = await prisma.themeShare.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ThemeShareCreateManyArgs>(args?: SelectSubset<T, ThemeShareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ThemeShares and returns the data saved in the database.
     * @param {ThemeShareCreateManyAndReturnArgs} args - Arguments to create many ThemeShares.
     * @example
     * // Create many ThemeShares
     * const themeShare = await prisma.themeShare.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ThemeShares and only return the `id`
     * const themeShareWithIdOnly = await prisma.themeShare.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ThemeShareCreateManyAndReturnArgs>(args?: SelectSubset<T, ThemeShareCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ThemeShare.
     * @param {ThemeShareDeleteArgs} args - Arguments to delete one ThemeShare.
     * @example
     * // Delete one ThemeShare
     * const ThemeShare = await prisma.themeShare.delete({
     *   where: {
     *     // ... filter to delete one ThemeShare
     *   }
     * })
     * 
     */
    delete<T extends ThemeShareDeleteArgs>(args: SelectSubset<T, ThemeShareDeleteArgs<ExtArgs>>): Prisma__ThemeShareClient<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ThemeShare.
     * @param {ThemeShareUpdateArgs} args - Arguments to update one ThemeShare.
     * @example
     * // Update one ThemeShare
     * const themeShare = await prisma.themeShare.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ThemeShareUpdateArgs>(args: SelectSubset<T, ThemeShareUpdateArgs<ExtArgs>>): Prisma__ThemeShareClient<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ThemeShares.
     * @param {ThemeShareDeleteManyArgs} args - Arguments to filter ThemeShares to delete.
     * @example
     * // Delete a few ThemeShares
     * const { count } = await prisma.themeShare.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ThemeShareDeleteManyArgs>(args?: SelectSubset<T, ThemeShareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ThemeShares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeShareUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ThemeShares
     * const themeShare = await prisma.themeShare.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ThemeShareUpdateManyArgs>(args: SelectSubset<T, ThemeShareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ThemeShares and returns the data updated in the database.
     * @param {ThemeShareUpdateManyAndReturnArgs} args - Arguments to update many ThemeShares.
     * @example
     * // Update many ThemeShares
     * const themeShare = await prisma.themeShare.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ThemeShares and only return the `id`
     * const themeShareWithIdOnly = await prisma.themeShare.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ThemeShareUpdateManyAndReturnArgs>(args: SelectSubset<T, ThemeShareUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ThemeShare.
     * @param {ThemeShareUpsertArgs} args - Arguments to update or create a ThemeShare.
     * @example
     * // Update or create a ThemeShare
     * const themeShare = await prisma.themeShare.upsert({
     *   create: {
     *     // ... data to create a ThemeShare
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ThemeShare we want to update
     *   }
     * })
     */
    upsert<T extends ThemeShareUpsertArgs>(args: SelectSubset<T, ThemeShareUpsertArgs<ExtArgs>>): Prisma__ThemeShareClient<$Result.GetResult<Prisma.$ThemeSharePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ThemeShares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeShareCountArgs} args - Arguments to filter ThemeShares to count.
     * @example
     * // Count the number of ThemeShares
     * const count = await prisma.themeShare.count({
     *   where: {
     *     // ... the filter for the ThemeShares we want to count
     *   }
     * })
    **/
    count<T extends ThemeShareCountArgs>(
      args?: Subset<T, ThemeShareCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ThemeShareCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ThemeShare.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeShareAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ThemeShareAggregateArgs>(args: Subset<T, ThemeShareAggregateArgs>): Prisma.PrismaPromise<GetThemeShareAggregateType<T>>

    /**
     * Group by ThemeShare.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeShareGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ThemeShareGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ThemeShareGroupByArgs['orderBy'] }
        : { orderBy?: ThemeShareGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ThemeShareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetThemeShareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ThemeShare model
   */
  readonly fields: ThemeShareFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ThemeShare.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ThemeShareClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    theme<T extends ThemeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ThemeDefaultArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ThemeShare model
   */
  interface ThemeShareFieldRefs {
    readonly id: FieldRef<"ThemeShare", 'String'>
    readonly themeId: FieldRef<"ThemeShare", 'String'>
    readonly sharedBy: FieldRef<"ThemeShare", 'String'>
    readonly sharedWith: FieldRef<"ThemeShare", 'String'>
    readonly createdAt: FieldRef<"ThemeShare", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ThemeShare findUnique
   */
  export type ThemeShareFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
    /**
     * Filter, which ThemeShare to fetch.
     */
    where: ThemeShareWhereUniqueInput
  }

  /**
   * ThemeShare findUniqueOrThrow
   */
  export type ThemeShareFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
    /**
     * Filter, which ThemeShare to fetch.
     */
    where: ThemeShareWhereUniqueInput
  }

  /**
   * ThemeShare findFirst
   */
  export type ThemeShareFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
    /**
     * Filter, which ThemeShare to fetch.
     */
    where?: ThemeShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThemeShares to fetch.
     */
    orderBy?: ThemeShareOrderByWithRelationInput | ThemeShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ThemeShares.
     */
    cursor?: ThemeShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThemeShares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThemeShares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ThemeShares.
     */
    distinct?: ThemeShareScalarFieldEnum | ThemeShareScalarFieldEnum[]
  }

  /**
   * ThemeShare findFirstOrThrow
   */
  export type ThemeShareFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
    /**
     * Filter, which ThemeShare to fetch.
     */
    where?: ThemeShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThemeShares to fetch.
     */
    orderBy?: ThemeShareOrderByWithRelationInput | ThemeShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ThemeShares.
     */
    cursor?: ThemeShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThemeShares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThemeShares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ThemeShares.
     */
    distinct?: ThemeShareScalarFieldEnum | ThemeShareScalarFieldEnum[]
  }

  /**
   * ThemeShare findMany
   */
  export type ThemeShareFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
    /**
     * Filter, which ThemeShares to fetch.
     */
    where?: ThemeShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThemeShares to fetch.
     */
    orderBy?: ThemeShareOrderByWithRelationInput | ThemeShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ThemeShares.
     */
    cursor?: ThemeShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThemeShares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThemeShares.
     */
    skip?: number
    distinct?: ThemeShareScalarFieldEnum | ThemeShareScalarFieldEnum[]
  }

  /**
   * ThemeShare create
   */
  export type ThemeShareCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
    /**
     * The data needed to create a ThemeShare.
     */
    data: XOR<ThemeShareCreateInput, ThemeShareUncheckedCreateInput>
  }

  /**
   * ThemeShare createMany
   */
  export type ThemeShareCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ThemeShares.
     */
    data: ThemeShareCreateManyInput | ThemeShareCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ThemeShare createManyAndReturn
   */
  export type ThemeShareCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * The data used to create many ThemeShares.
     */
    data: ThemeShareCreateManyInput | ThemeShareCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ThemeShare update
   */
  export type ThemeShareUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
    /**
     * The data needed to update a ThemeShare.
     */
    data: XOR<ThemeShareUpdateInput, ThemeShareUncheckedUpdateInput>
    /**
     * Choose, which ThemeShare to update.
     */
    where: ThemeShareWhereUniqueInput
  }

  /**
   * ThemeShare updateMany
   */
  export type ThemeShareUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ThemeShares.
     */
    data: XOR<ThemeShareUpdateManyMutationInput, ThemeShareUncheckedUpdateManyInput>
    /**
     * Filter which ThemeShares to update
     */
    where?: ThemeShareWhereInput
    /**
     * Limit how many ThemeShares to update.
     */
    limit?: number
  }

  /**
   * ThemeShare updateManyAndReturn
   */
  export type ThemeShareUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * The data used to update ThemeShares.
     */
    data: XOR<ThemeShareUpdateManyMutationInput, ThemeShareUncheckedUpdateManyInput>
    /**
     * Filter which ThemeShares to update
     */
    where?: ThemeShareWhereInput
    /**
     * Limit how many ThemeShares to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ThemeShare upsert
   */
  export type ThemeShareUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
    /**
     * The filter to search for the ThemeShare to update in case it exists.
     */
    where: ThemeShareWhereUniqueInput
    /**
     * In case the ThemeShare found by the `where` argument doesn't exist, create a new ThemeShare with this data.
     */
    create: XOR<ThemeShareCreateInput, ThemeShareUncheckedCreateInput>
    /**
     * In case the ThemeShare was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ThemeShareUpdateInput, ThemeShareUncheckedUpdateInput>
  }

  /**
   * ThemeShare delete
   */
  export type ThemeShareDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
    /**
     * Filter which ThemeShare to delete.
     */
    where: ThemeShareWhereUniqueInput
  }

  /**
   * ThemeShare deleteMany
   */
  export type ThemeShareDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ThemeShares to delete
     */
    where?: ThemeShareWhereInput
    /**
     * Limit how many ThemeShares to delete.
     */
    limit?: number
  }

  /**
   * ThemeShare without action
   */
  export type ThemeShareDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemeShare
     */
    select?: ThemeShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThemeShare
     */
    omit?: ThemeShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeShareInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ColorPaletteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    colors: 'colors',
    isBuiltIn: 'isBuiltIn',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ColorPaletteScalarFieldEnum = (typeof ColorPaletteScalarFieldEnum)[keyof typeof ColorPaletteScalarFieldEnum]


  export const GeneratedThemeScalarFieldEnum: {
    id: 'id',
    themeId: 'themeId',
    generatedJson: 'generatedJson',
    version: 'version',
    createdAt: 'createdAt'
  };

  export type GeneratedThemeScalarFieldEnum = (typeof GeneratedThemeScalarFieldEnum)[keyof typeof GeneratedThemeScalarFieldEnum]


  export const NeutralPaletteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    colors: 'colors',
    isBuiltIn: 'isBuiltIn',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NeutralPaletteScalarFieldEnum = (typeof NeutralPaletteScalarFieldEnum)[keyof typeof NeutralPaletteScalarFieldEnum]


  export const ThemeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    themeData: 'themeData',
    version: 'version',
    isDefault: 'isDefault',
    organizationId: 'organizationId',
    visibility: 'visibility',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ThemeScalarFieldEnum = (typeof ThemeScalarFieldEnum)[keyof typeof ThemeScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    plan: 'plan',
    stripeCustomerId: 'stripeCustomerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    clerkOrgId: 'clerkOrgId',
    name: 'name',
    seats: 'seats',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const OrganizationMemberScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    userId: 'userId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type OrganizationMemberScalarFieldEnum = (typeof OrganizationMemberScalarFieldEnum)[keyof typeof OrganizationMemberScalarFieldEnum]


  export const PurchaseScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    organizationId: 'organizationId',
    stripeCustomerId: 'stripeCustomerId',
    stripePaymentId: 'stripePaymentId',
    stripePriceId: 'stripePriceId',
    amount: 'amount',
    currency: 'currency',
    plan: 'plan',
    seats: 'seats',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type PurchaseScalarFieldEnum = (typeof PurchaseScalarFieldEnum)[keyof typeof PurchaseScalarFieldEnum]


  export const ThemeShareScalarFieldEnum: {
    id: 'id',
    themeId: 'themeId',
    sharedBy: 'sharedBy',
    sharedWith: 'sharedWith',
    createdAt: 'createdAt'
  };

  export type ThemeShareScalarFieldEnum = (typeof ThemeShareScalarFieldEnum)[keyof typeof ThemeShareScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ThemeVisibility'
   */
  export type EnumThemeVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ThemeVisibility'>
    


  /**
   * Reference to a field of type 'ThemeVisibility[]'
   */
  export type ListEnumThemeVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ThemeVisibility[]'>
    


  /**
   * Reference to a field of type 'UserPlan'
   */
  export type EnumUserPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserPlan'>
    


  /**
   * Reference to a field of type 'UserPlan[]'
   */
  export type ListEnumUserPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserPlan[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'OrganizationRole'
   */
  export type EnumOrganizationRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrganizationRole'>
    


  /**
   * Reference to a field of type 'OrganizationRole[]'
   */
  export type ListEnumOrganizationRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrganizationRole[]'>
    


  /**
   * Reference to a field of type 'PurchasePlan'
   */
  export type EnumPurchasePlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PurchasePlan'>
    


  /**
   * Reference to a field of type 'PurchasePlan[]'
   */
  export type ListEnumPurchasePlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PurchasePlan[]'>
    


  /**
   * Reference to a field of type 'PurchaseStatus'
   */
  export type EnumPurchaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PurchaseStatus'>
    


  /**
   * Reference to a field of type 'PurchaseStatus[]'
   */
  export type ListEnumPurchaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PurchaseStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ColorPaletteWhereInput = {
    AND?: ColorPaletteWhereInput | ColorPaletteWhereInput[]
    OR?: ColorPaletteWhereInput[]
    NOT?: ColorPaletteWhereInput | ColorPaletteWhereInput[]
    id?: StringFilter<"ColorPalette"> | string
    userId?: StringFilter<"ColorPalette"> | string
    name?: StringFilter<"ColorPalette"> | string
    description?: StringNullableFilter<"ColorPalette"> | string | null
    colors?: JsonFilter<"ColorPalette">
    isBuiltIn?: BoolFilter<"ColorPalette"> | boolean
    createdAt?: DateTimeFilter<"ColorPalette"> | Date | string
    updatedAt?: DateTimeFilter<"ColorPalette"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ColorPaletteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    colors?: SortOrder
    isBuiltIn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ColorPaletteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ColorPaletteWhereInput | ColorPaletteWhereInput[]
    OR?: ColorPaletteWhereInput[]
    NOT?: ColorPaletteWhereInput | ColorPaletteWhereInput[]
    userId?: StringFilter<"ColorPalette"> | string
    name?: StringFilter<"ColorPalette"> | string
    description?: StringNullableFilter<"ColorPalette"> | string | null
    colors?: JsonFilter<"ColorPalette">
    isBuiltIn?: BoolFilter<"ColorPalette"> | boolean
    createdAt?: DateTimeFilter<"ColorPalette"> | Date | string
    updatedAt?: DateTimeFilter<"ColorPalette"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ColorPaletteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    colors?: SortOrder
    isBuiltIn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ColorPaletteCountOrderByAggregateInput
    _max?: ColorPaletteMaxOrderByAggregateInput
    _min?: ColorPaletteMinOrderByAggregateInput
  }

  export type ColorPaletteScalarWhereWithAggregatesInput = {
    AND?: ColorPaletteScalarWhereWithAggregatesInput | ColorPaletteScalarWhereWithAggregatesInput[]
    OR?: ColorPaletteScalarWhereWithAggregatesInput[]
    NOT?: ColorPaletteScalarWhereWithAggregatesInput | ColorPaletteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ColorPalette"> | string
    userId?: StringWithAggregatesFilter<"ColorPalette"> | string
    name?: StringWithAggregatesFilter<"ColorPalette"> | string
    description?: StringNullableWithAggregatesFilter<"ColorPalette"> | string | null
    colors?: JsonWithAggregatesFilter<"ColorPalette">
    isBuiltIn?: BoolWithAggregatesFilter<"ColorPalette"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ColorPalette"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ColorPalette"> | Date | string
  }

  export type GeneratedThemeWhereInput = {
    AND?: GeneratedThemeWhereInput | GeneratedThemeWhereInput[]
    OR?: GeneratedThemeWhereInput[]
    NOT?: GeneratedThemeWhereInput | GeneratedThemeWhereInput[]
    id?: StringFilter<"GeneratedTheme"> | string
    themeId?: StringFilter<"GeneratedTheme"> | string
    generatedJson?: JsonFilter<"GeneratedTheme">
    version?: StringFilter<"GeneratedTheme"> | string
    createdAt?: DateTimeFilter<"GeneratedTheme"> | Date | string
    theme?: XOR<ThemeScalarRelationFilter, ThemeWhereInput>
  }

  export type GeneratedThemeOrderByWithRelationInput = {
    id?: SortOrder
    themeId?: SortOrder
    generatedJson?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    theme?: ThemeOrderByWithRelationInput
  }

  export type GeneratedThemeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GeneratedThemeWhereInput | GeneratedThemeWhereInput[]
    OR?: GeneratedThemeWhereInput[]
    NOT?: GeneratedThemeWhereInput | GeneratedThemeWhereInput[]
    themeId?: StringFilter<"GeneratedTheme"> | string
    generatedJson?: JsonFilter<"GeneratedTheme">
    version?: StringFilter<"GeneratedTheme"> | string
    createdAt?: DateTimeFilter<"GeneratedTheme"> | Date | string
    theme?: XOR<ThemeScalarRelationFilter, ThemeWhereInput>
  }, "id">

  export type GeneratedThemeOrderByWithAggregationInput = {
    id?: SortOrder
    themeId?: SortOrder
    generatedJson?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    _count?: GeneratedThemeCountOrderByAggregateInput
    _max?: GeneratedThemeMaxOrderByAggregateInput
    _min?: GeneratedThemeMinOrderByAggregateInput
  }

  export type GeneratedThemeScalarWhereWithAggregatesInput = {
    AND?: GeneratedThemeScalarWhereWithAggregatesInput | GeneratedThemeScalarWhereWithAggregatesInput[]
    OR?: GeneratedThemeScalarWhereWithAggregatesInput[]
    NOT?: GeneratedThemeScalarWhereWithAggregatesInput | GeneratedThemeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GeneratedTheme"> | string
    themeId?: StringWithAggregatesFilter<"GeneratedTheme"> | string
    generatedJson?: JsonWithAggregatesFilter<"GeneratedTheme">
    version?: StringWithAggregatesFilter<"GeneratedTheme"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GeneratedTheme"> | Date | string
  }

  export type NeutralPaletteWhereInput = {
    AND?: NeutralPaletteWhereInput | NeutralPaletteWhereInput[]
    OR?: NeutralPaletteWhereInput[]
    NOT?: NeutralPaletteWhereInput | NeutralPaletteWhereInput[]
    id?: StringFilter<"NeutralPalette"> | string
    userId?: StringNullableFilter<"NeutralPalette"> | string | null
    name?: StringFilter<"NeutralPalette"> | string
    colors?: JsonFilter<"NeutralPalette">
    isBuiltIn?: BoolFilter<"NeutralPalette"> | boolean
    createdAt?: DateTimeFilter<"NeutralPalette"> | Date | string
    updatedAt?: DateTimeFilter<"NeutralPalette"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type NeutralPaletteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    name?: SortOrder
    colors?: SortOrder
    isBuiltIn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NeutralPaletteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NeutralPaletteWhereInput | NeutralPaletteWhereInput[]
    OR?: NeutralPaletteWhereInput[]
    NOT?: NeutralPaletteWhereInput | NeutralPaletteWhereInput[]
    userId?: StringNullableFilter<"NeutralPalette"> | string | null
    name?: StringFilter<"NeutralPalette"> | string
    colors?: JsonFilter<"NeutralPalette">
    isBuiltIn?: BoolFilter<"NeutralPalette"> | boolean
    createdAt?: DateTimeFilter<"NeutralPalette"> | Date | string
    updatedAt?: DateTimeFilter<"NeutralPalette"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type NeutralPaletteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    name?: SortOrder
    colors?: SortOrder
    isBuiltIn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NeutralPaletteCountOrderByAggregateInput
    _max?: NeutralPaletteMaxOrderByAggregateInput
    _min?: NeutralPaletteMinOrderByAggregateInput
  }

  export type NeutralPaletteScalarWhereWithAggregatesInput = {
    AND?: NeutralPaletteScalarWhereWithAggregatesInput | NeutralPaletteScalarWhereWithAggregatesInput[]
    OR?: NeutralPaletteScalarWhereWithAggregatesInput[]
    NOT?: NeutralPaletteScalarWhereWithAggregatesInput | NeutralPaletteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NeutralPalette"> | string
    userId?: StringNullableWithAggregatesFilter<"NeutralPalette"> | string | null
    name?: StringWithAggregatesFilter<"NeutralPalette"> | string
    colors?: JsonWithAggregatesFilter<"NeutralPalette">
    isBuiltIn?: BoolWithAggregatesFilter<"NeutralPalette"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"NeutralPalette"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NeutralPalette"> | Date | string
  }

  export type ThemeWhereInput = {
    AND?: ThemeWhereInput | ThemeWhereInput[]
    OR?: ThemeWhereInput[]
    NOT?: ThemeWhereInput | ThemeWhereInput[]
    id?: StringFilter<"Theme"> | string
    userId?: StringFilter<"Theme"> | string
    name?: StringFilter<"Theme"> | string
    description?: StringNullableFilter<"Theme"> | string | null
    themeData?: JsonFilter<"Theme">
    version?: StringFilter<"Theme"> | string
    isDefault?: BoolFilter<"Theme"> | boolean
    organizationId?: StringNullableFilter<"Theme"> | string | null
    visibility?: EnumThemeVisibilityFilter<"Theme"> | $Enums.ThemeVisibility
    createdAt?: DateTimeFilter<"Theme"> | Date | string
    updatedAt?: DateTimeFilter<"Theme"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    generatedThemes?: GeneratedThemeListRelationFilter
    sharedWith?: ThemeShareListRelationFilter
  }

  export type ThemeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    themeData?: SortOrder
    version?: SortOrder
    isDefault?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
    generatedThemes?: GeneratedThemeOrderByRelationAggregateInput
    sharedWith?: ThemeShareOrderByRelationAggregateInput
  }

  export type ThemeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ThemeWhereInput | ThemeWhereInput[]
    OR?: ThemeWhereInput[]
    NOT?: ThemeWhereInput | ThemeWhereInput[]
    userId?: StringFilter<"Theme"> | string
    name?: StringFilter<"Theme"> | string
    description?: StringNullableFilter<"Theme"> | string | null
    themeData?: JsonFilter<"Theme">
    version?: StringFilter<"Theme"> | string
    isDefault?: BoolFilter<"Theme"> | boolean
    organizationId?: StringNullableFilter<"Theme"> | string | null
    visibility?: EnumThemeVisibilityFilter<"Theme"> | $Enums.ThemeVisibility
    createdAt?: DateTimeFilter<"Theme"> | Date | string
    updatedAt?: DateTimeFilter<"Theme"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    generatedThemes?: GeneratedThemeListRelationFilter
    sharedWith?: ThemeShareListRelationFilter
  }, "id">

  export type ThemeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    themeData?: SortOrder
    version?: SortOrder
    isDefault?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ThemeCountOrderByAggregateInput
    _max?: ThemeMaxOrderByAggregateInput
    _min?: ThemeMinOrderByAggregateInput
  }

  export type ThemeScalarWhereWithAggregatesInput = {
    AND?: ThemeScalarWhereWithAggregatesInput | ThemeScalarWhereWithAggregatesInput[]
    OR?: ThemeScalarWhereWithAggregatesInput[]
    NOT?: ThemeScalarWhereWithAggregatesInput | ThemeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Theme"> | string
    userId?: StringWithAggregatesFilter<"Theme"> | string
    name?: StringWithAggregatesFilter<"Theme"> | string
    description?: StringNullableWithAggregatesFilter<"Theme"> | string | null
    themeData?: JsonWithAggregatesFilter<"Theme">
    version?: StringWithAggregatesFilter<"Theme"> | string
    isDefault?: BoolWithAggregatesFilter<"Theme"> | boolean
    organizationId?: StringNullableWithAggregatesFilter<"Theme"> | string | null
    visibility?: EnumThemeVisibilityWithAggregatesFilter<"Theme"> | $Enums.ThemeVisibility
    createdAt?: DateTimeWithAggregatesFilter<"Theme"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Theme"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    plan?: EnumUserPlanFilter<"User"> | $Enums.UserPlan
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    themes?: ThemeListRelationFilter
    colorPalettes?: ColorPaletteListRelationFilter
    neutralPalettes?: NeutralPaletteListRelationFilter
    organizationMemberships?: OrganizationMemberListRelationFilter
    purchase?: XOR<PurchaseNullableScalarRelationFilter, PurchaseWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    plan?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    themes?: ThemeOrderByRelationAggregateInput
    colorPalettes?: ColorPaletteOrderByRelationAggregateInput
    neutralPalettes?: NeutralPaletteOrderByRelationAggregateInput
    organizationMemberships?: OrganizationMemberOrderByRelationAggregateInput
    purchase?: PurchaseOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    stripeCustomerId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    plan?: EnumUserPlanFilter<"User"> | $Enums.UserPlan
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    themes?: ThemeListRelationFilter
    colorPalettes?: ColorPaletteListRelationFilter
    neutralPalettes?: NeutralPaletteListRelationFilter
    organizationMemberships?: OrganizationMemberListRelationFilter
    purchase?: XOR<PurchaseNullableScalarRelationFilter, PurchaseWhereInput> | null
  }, "id" | "email" | "stripeCustomerId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    plan?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    plan?: EnumUserPlanWithAggregatesFilter<"User"> | $Enums.UserPlan
    stripeCustomerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    clerkOrgId?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    seats?: IntFilter<"Organization"> | number
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    members?: OrganizationMemberListRelationFilter
    themes?: ThemeListRelationFilter
    purchase?: XOR<PurchaseNullableScalarRelationFilter, PurchaseWhereInput> | null
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    clerkOrgId?: SortOrder
    name?: SortOrder
    seats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    members?: OrganizationMemberOrderByRelationAggregateInput
    themes?: ThemeOrderByRelationAggregateInput
    purchase?: PurchaseOrderByWithRelationInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clerkOrgId?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    seats?: IntFilter<"Organization"> | number
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    members?: OrganizationMemberListRelationFilter
    themes?: ThemeListRelationFilter
    purchase?: XOR<PurchaseNullableScalarRelationFilter, PurchaseWhereInput> | null
  }, "id" | "clerkOrgId">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    clerkOrgId?: SortOrder
    name?: SortOrder
    seats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _avg?: OrganizationAvgOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
    _sum?: OrganizationSumOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    clerkOrgId?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    seats?: IntWithAggregatesFilter<"Organization"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type OrganizationMemberWhereInput = {
    AND?: OrganizationMemberWhereInput | OrganizationMemberWhereInput[]
    OR?: OrganizationMemberWhereInput[]
    NOT?: OrganizationMemberWhereInput | OrganizationMemberWhereInput[]
    id?: StringFilter<"OrganizationMember"> | string
    organizationId?: StringFilter<"OrganizationMember"> | string
    userId?: StringFilter<"OrganizationMember"> | string
    role?: EnumOrganizationRoleFilter<"OrganizationMember"> | $Enums.OrganizationRole
    createdAt?: DateTimeFilter<"OrganizationMember"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OrganizationMemberOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OrganizationMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    organizationId_userId?: OrganizationMemberOrganizationIdUserIdCompoundUniqueInput
    AND?: OrganizationMemberWhereInput | OrganizationMemberWhereInput[]
    OR?: OrganizationMemberWhereInput[]
    NOT?: OrganizationMemberWhereInput | OrganizationMemberWhereInput[]
    organizationId?: StringFilter<"OrganizationMember"> | string
    userId?: StringFilter<"OrganizationMember"> | string
    role?: EnumOrganizationRoleFilter<"OrganizationMember"> | $Enums.OrganizationRole
    createdAt?: DateTimeFilter<"OrganizationMember"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "organizationId_userId">

  export type OrganizationMemberOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: OrganizationMemberCountOrderByAggregateInput
    _max?: OrganizationMemberMaxOrderByAggregateInput
    _min?: OrganizationMemberMinOrderByAggregateInput
  }

  export type OrganizationMemberScalarWhereWithAggregatesInput = {
    AND?: OrganizationMemberScalarWhereWithAggregatesInput | OrganizationMemberScalarWhereWithAggregatesInput[]
    OR?: OrganizationMemberScalarWhereWithAggregatesInput[]
    NOT?: OrganizationMemberScalarWhereWithAggregatesInput | OrganizationMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrganizationMember"> | string
    organizationId?: StringWithAggregatesFilter<"OrganizationMember"> | string
    userId?: StringWithAggregatesFilter<"OrganizationMember"> | string
    role?: EnumOrganizationRoleWithAggregatesFilter<"OrganizationMember"> | $Enums.OrganizationRole
    createdAt?: DateTimeWithAggregatesFilter<"OrganizationMember"> | Date | string
  }

  export type PurchaseWhereInput = {
    AND?: PurchaseWhereInput | PurchaseWhereInput[]
    OR?: PurchaseWhereInput[]
    NOT?: PurchaseWhereInput | PurchaseWhereInput[]
    id?: StringFilter<"Purchase"> | string
    userId?: StringNullableFilter<"Purchase"> | string | null
    organizationId?: StringNullableFilter<"Purchase"> | string | null
    stripeCustomerId?: StringFilter<"Purchase"> | string
    stripePaymentId?: StringFilter<"Purchase"> | string
    stripePriceId?: StringFilter<"Purchase"> | string
    amount?: IntFilter<"Purchase"> | number
    currency?: StringFilter<"Purchase"> | string
    plan?: EnumPurchasePlanFilter<"Purchase"> | $Enums.PurchasePlan
    seats?: IntNullableFilter<"Purchase"> | number | null
    status?: EnumPurchaseStatusFilter<"Purchase"> | $Enums.PurchaseStatus
    createdAt?: DateTimeFilter<"Purchase"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
  }

  export type PurchaseOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrder
    stripePaymentId?: SortOrder
    stripePriceId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    plan?: SortOrder
    seats?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
  }

  export type PurchaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    organizationId?: string
    stripePaymentId?: string
    AND?: PurchaseWhereInput | PurchaseWhereInput[]
    OR?: PurchaseWhereInput[]
    NOT?: PurchaseWhereInput | PurchaseWhereInput[]
    stripeCustomerId?: StringFilter<"Purchase"> | string
    stripePriceId?: StringFilter<"Purchase"> | string
    amount?: IntFilter<"Purchase"> | number
    currency?: StringFilter<"Purchase"> | string
    plan?: EnumPurchasePlanFilter<"Purchase"> | $Enums.PurchasePlan
    seats?: IntNullableFilter<"Purchase"> | number | null
    status?: EnumPurchaseStatusFilter<"Purchase"> | $Enums.PurchaseStatus
    createdAt?: DateTimeFilter<"Purchase"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
  }, "id" | "userId" | "organizationId" | "stripePaymentId">

  export type PurchaseOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrder
    stripePaymentId?: SortOrder
    stripePriceId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    plan?: SortOrder
    seats?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: PurchaseCountOrderByAggregateInput
    _avg?: PurchaseAvgOrderByAggregateInput
    _max?: PurchaseMaxOrderByAggregateInput
    _min?: PurchaseMinOrderByAggregateInput
    _sum?: PurchaseSumOrderByAggregateInput
  }

  export type PurchaseScalarWhereWithAggregatesInput = {
    AND?: PurchaseScalarWhereWithAggregatesInput | PurchaseScalarWhereWithAggregatesInput[]
    OR?: PurchaseScalarWhereWithAggregatesInput[]
    NOT?: PurchaseScalarWhereWithAggregatesInput | PurchaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Purchase"> | string
    userId?: StringNullableWithAggregatesFilter<"Purchase"> | string | null
    organizationId?: StringNullableWithAggregatesFilter<"Purchase"> | string | null
    stripeCustomerId?: StringWithAggregatesFilter<"Purchase"> | string
    stripePaymentId?: StringWithAggregatesFilter<"Purchase"> | string
    stripePriceId?: StringWithAggregatesFilter<"Purchase"> | string
    amount?: IntWithAggregatesFilter<"Purchase"> | number
    currency?: StringWithAggregatesFilter<"Purchase"> | string
    plan?: EnumPurchasePlanWithAggregatesFilter<"Purchase"> | $Enums.PurchasePlan
    seats?: IntNullableWithAggregatesFilter<"Purchase"> | number | null
    status?: EnumPurchaseStatusWithAggregatesFilter<"Purchase"> | $Enums.PurchaseStatus
    createdAt?: DateTimeWithAggregatesFilter<"Purchase"> | Date | string
  }

  export type ThemeShareWhereInput = {
    AND?: ThemeShareWhereInput | ThemeShareWhereInput[]
    OR?: ThemeShareWhereInput[]
    NOT?: ThemeShareWhereInput | ThemeShareWhereInput[]
    id?: StringFilter<"ThemeShare"> | string
    themeId?: StringFilter<"ThemeShare"> | string
    sharedBy?: StringFilter<"ThemeShare"> | string
    sharedWith?: StringFilter<"ThemeShare"> | string
    createdAt?: DateTimeFilter<"ThemeShare"> | Date | string
    theme?: XOR<ThemeScalarRelationFilter, ThemeWhereInput>
  }

  export type ThemeShareOrderByWithRelationInput = {
    id?: SortOrder
    themeId?: SortOrder
    sharedBy?: SortOrder
    sharedWith?: SortOrder
    createdAt?: SortOrder
    theme?: ThemeOrderByWithRelationInput
  }

  export type ThemeShareWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    themeId_sharedWith?: ThemeShareThemeIdSharedWithCompoundUniqueInput
    AND?: ThemeShareWhereInput | ThemeShareWhereInput[]
    OR?: ThemeShareWhereInput[]
    NOT?: ThemeShareWhereInput | ThemeShareWhereInput[]
    themeId?: StringFilter<"ThemeShare"> | string
    sharedBy?: StringFilter<"ThemeShare"> | string
    sharedWith?: StringFilter<"ThemeShare"> | string
    createdAt?: DateTimeFilter<"ThemeShare"> | Date | string
    theme?: XOR<ThemeScalarRelationFilter, ThemeWhereInput>
  }, "id" | "themeId_sharedWith">

  export type ThemeShareOrderByWithAggregationInput = {
    id?: SortOrder
    themeId?: SortOrder
    sharedBy?: SortOrder
    sharedWith?: SortOrder
    createdAt?: SortOrder
    _count?: ThemeShareCountOrderByAggregateInput
    _max?: ThemeShareMaxOrderByAggregateInput
    _min?: ThemeShareMinOrderByAggregateInput
  }

  export type ThemeShareScalarWhereWithAggregatesInput = {
    AND?: ThemeShareScalarWhereWithAggregatesInput | ThemeShareScalarWhereWithAggregatesInput[]
    OR?: ThemeShareScalarWhereWithAggregatesInput[]
    NOT?: ThemeShareScalarWhereWithAggregatesInput | ThemeShareScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ThemeShare"> | string
    themeId?: StringWithAggregatesFilter<"ThemeShare"> | string
    sharedBy?: StringWithAggregatesFilter<"ThemeShare"> | string
    sharedWith?: StringWithAggregatesFilter<"ThemeShare"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ThemeShare"> | Date | string
  }

  export type ColorPaletteCreateInput = {
    id?: string
    name: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutColorPalettesInput
  }

  export type ColorPaletteUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColorPaletteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutColorPalettesNestedInput
  }

  export type ColorPaletteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColorPaletteCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColorPaletteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColorPaletteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedThemeCreateInput = {
    id?: string
    generatedJson: JsonNullValueInput | InputJsonValue
    version: string
    createdAt?: Date | string
    theme: ThemeCreateNestedOneWithoutGeneratedThemesInput
  }

  export type GeneratedThemeUncheckedCreateInput = {
    id?: string
    themeId: string
    generatedJson: JsonNullValueInput | InputJsonValue
    version: string
    createdAt?: Date | string
  }

  export type GeneratedThemeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    generatedJson?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    theme?: ThemeUpdateOneRequiredWithoutGeneratedThemesNestedInput
  }

  export type GeneratedThemeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    themeId?: StringFieldUpdateOperationsInput | string
    generatedJson?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedThemeCreateManyInput = {
    id?: string
    themeId: string
    generatedJson: JsonNullValueInput | InputJsonValue
    version: string
    createdAt?: Date | string
  }

  export type GeneratedThemeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    generatedJson?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedThemeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    themeId?: StringFieldUpdateOperationsInput | string
    generatedJson?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NeutralPaletteCreateInput = {
    id?: string
    name: string
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutNeutralPalettesInput
  }

  export type NeutralPaletteUncheckedCreateInput = {
    id?: string
    userId?: string | null
    name: string
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NeutralPaletteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutNeutralPalettesNestedInput
  }

  export type NeutralPaletteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NeutralPaletteCreateManyInput = {
    id?: string
    userId?: string | null
    name: string
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NeutralPaletteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NeutralPaletteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeCreateInput = {
    id?: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutThemesInput
    organization?: OrganizationCreateNestedOneWithoutThemesInput
    generatedThemes?: GeneratedThemeCreateNestedManyWithoutThemeInput
    sharedWith?: ThemeShareCreateNestedManyWithoutThemeInput
  }

  export type ThemeUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    organizationId?: string | null
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
    generatedThemes?: GeneratedThemeUncheckedCreateNestedManyWithoutThemeInput
    sharedWith?: ThemeShareUncheckedCreateNestedManyWithoutThemeInput
  }

  export type ThemeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutThemesNestedInput
    organization?: OrganizationUpdateOneWithoutThemesNestedInput
    generatedThemes?: GeneratedThemeUpdateManyWithoutThemeNestedInput
    sharedWith?: ThemeShareUpdateManyWithoutThemeNestedInput
  }

  export type ThemeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedThemes?: GeneratedThemeUncheckedUpdateManyWithoutThemeNestedInput
    sharedWith?: ThemeShareUncheckedUpdateManyWithoutThemeNestedInput
  }

  export type ThemeCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    organizationId?: string | null
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ThemeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeCreateNestedManyWithoutUserInput
    colorPalettes?: ColorPaletteCreateNestedManyWithoutUserInput
    neutralPalettes?: NeutralPaletteCreateNestedManyWithoutUserInput
    organizationMemberships?: OrganizationMemberCreateNestedManyWithoutUserInput
    purchase?: PurchaseCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeUncheckedCreateNestedManyWithoutUserInput
    colorPalettes?: ColorPaletteUncheckedCreateNestedManyWithoutUserInput
    neutralPalettes?: NeutralPaletteUncheckedCreateNestedManyWithoutUserInput
    organizationMemberships?: OrganizationMemberUncheckedCreateNestedManyWithoutUserInput
    purchase?: PurchaseUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUpdateManyWithoutUserNestedInput
    colorPalettes?: ColorPaletteUpdateManyWithoutUserNestedInput
    neutralPalettes?: NeutralPaletteUpdateManyWithoutUserNestedInput
    organizationMemberships?: OrganizationMemberUpdateManyWithoutUserNestedInput
    purchase?: PurchaseUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUncheckedUpdateManyWithoutUserNestedInput
    colorPalettes?: ColorPaletteUncheckedUpdateManyWithoutUserNestedInput
    neutralPalettes?: NeutralPaletteUncheckedUpdateManyWithoutUserNestedInput
    organizationMemberships?: OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput
    purchase?: PurchaseUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    clerkOrgId: string
    name: string
    seats: number
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: OrganizationMemberCreateNestedManyWithoutOrganizationInput
    themes?: ThemeCreateNestedManyWithoutOrganizationInput
    purchase?: PurchaseCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    clerkOrgId: string
    name: string
    seats: number
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput
    themes?: ThemeUncheckedCreateNestedManyWithoutOrganizationInput
    purchase?: PurchaseUncheckedCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkOrgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: OrganizationMemberUpdateManyWithoutOrganizationNestedInput
    themes?: ThemeUpdateManyWithoutOrganizationNestedInput
    purchase?: PurchaseUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkOrgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput
    themes?: ThemeUncheckedUpdateManyWithoutOrganizationNestedInput
    purchase?: PurchaseUncheckedUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    clerkOrgId: string
    name: string
    seats: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkOrgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkOrgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationMemberCreateInput = {
    id?: string
    role?: $Enums.OrganizationRole
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutOrganizationMembershipsInput
  }

  export type OrganizationMemberUncheckedCreateInput = {
    id?: string
    organizationId: string
    userId: string
    role?: $Enums.OrganizationRole
    createdAt?: Date | string
  }

  export type OrganizationMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumOrganizationRoleFieldUpdateOperationsInput | $Enums.OrganizationRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutOrganizationMembershipsNestedInput
  }

  export type OrganizationMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumOrganizationRoleFieldUpdateOperationsInput | $Enums.OrganizationRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationMemberCreateManyInput = {
    id?: string
    organizationId: string
    userId: string
    role?: $Enums.OrganizationRole
    createdAt?: Date | string
  }

  export type OrganizationMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumOrganizationRoleFieldUpdateOperationsInput | $Enums.OrganizationRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumOrganizationRoleFieldUpdateOperationsInput | $Enums.OrganizationRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseCreateInput = {
    id?: string
    stripeCustomerId: string
    stripePaymentId: string
    stripePriceId: string
    amount: number
    currency?: string
    plan: $Enums.PurchasePlan
    seats?: number | null
    status?: $Enums.PurchaseStatus
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutPurchaseInput
    organization?: OrganizationCreateNestedOneWithoutPurchaseInput
  }

  export type PurchaseUncheckedCreateInput = {
    id?: string
    userId?: string | null
    organizationId?: string | null
    stripeCustomerId: string
    stripePaymentId: string
    stripePriceId: string
    amount: number
    currency?: string
    plan: $Enums.PurchasePlan
    seats?: number | null
    status?: $Enums.PurchaseStatus
    createdAt?: Date | string
  }

  export type PurchaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    stripePriceId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    plan?: EnumPurchasePlanFieldUpdateOperationsInput | $Enums.PurchasePlan
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | $Enums.PurchaseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPurchaseNestedInput
    organization?: OrganizationUpdateOneWithoutPurchaseNestedInput
  }

  export type PurchaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    stripePriceId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    plan?: EnumPurchasePlanFieldUpdateOperationsInput | $Enums.PurchasePlan
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | $Enums.PurchaseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseCreateManyInput = {
    id?: string
    userId?: string | null
    organizationId?: string | null
    stripeCustomerId: string
    stripePaymentId: string
    stripePriceId: string
    amount: number
    currency?: string
    plan: $Enums.PurchasePlan
    seats?: number | null
    status?: $Enums.PurchaseStatus
    createdAt?: Date | string
  }

  export type PurchaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    stripePriceId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    plan?: EnumPurchasePlanFieldUpdateOperationsInput | $Enums.PurchasePlan
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | $Enums.PurchaseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    stripePriceId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    plan?: EnumPurchasePlanFieldUpdateOperationsInput | $Enums.PurchasePlan
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | $Enums.PurchaseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeShareCreateInput = {
    id?: string
    sharedBy: string
    sharedWith: string
    createdAt?: Date | string
    theme: ThemeCreateNestedOneWithoutSharedWithInput
  }

  export type ThemeShareUncheckedCreateInput = {
    id?: string
    themeId: string
    sharedBy: string
    sharedWith: string
    createdAt?: Date | string
  }

  export type ThemeShareUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedBy?: StringFieldUpdateOperationsInput | string
    sharedWith?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    theme?: ThemeUpdateOneRequiredWithoutSharedWithNestedInput
  }

  export type ThemeShareUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    themeId?: StringFieldUpdateOperationsInput | string
    sharedBy?: StringFieldUpdateOperationsInput | string
    sharedWith?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeShareCreateManyInput = {
    id?: string
    themeId: string
    sharedBy: string
    sharedWith: string
    createdAt?: Date | string
  }

  export type ThemeShareUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedBy?: StringFieldUpdateOperationsInput | string
    sharedWith?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeShareUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    themeId?: StringFieldUpdateOperationsInput | string
    sharedBy?: StringFieldUpdateOperationsInput | string
    sharedWith?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ColorPaletteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    colors?: SortOrder
    isBuiltIn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColorPaletteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isBuiltIn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColorPaletteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isBuiltIn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ThemeScalarRelationFilter = {
    is?: ThemeWhereInput
    isNot?: ThemeWhereInput
  }

  export type GeneratedThemeCountOrderByAggregateInput = {
    id?: SortOrder
    themeId?: SortOrder
    generatedJson?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedThemeMaxOrderByAggregateInput = {
    id?: SortOrder
    themeId?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
  }

  export type GeneratedThemeMinOrderByAggregateInput = {
    id?: SortOrder
    themeId?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type NeutralPaletteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    colors?: SortOrder
    isBuiltIn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NeutralPaletteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    isBuiltIn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NeutralPaletteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    isBuiltIn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumThemeVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemeVisibility | EnumThemeVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ThemeVisibility[] | ListEnumThemeVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ThemeVisibility[] | ListEnumThemeVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumThemeVisibilityFilter<$PrismaModel> | $Enums.ThemeVisibility
  }

  export type OrganizationNullableScalarRelationFilter = {
    is?: OrganizationWhereInput | null
    isNot?: OrganizationWhereInput | null
  }

  export type GeneratedThemeListRelationFilter = {
    every?: GeneratedThemeWhereInput
    some?: GeneratedThemeWhereInput
    none?: GeneratedThemeWhereInput
  }

  export type ThemeShareListRelationFilter = {
    every?: ThemeShareWhereInput
    some?: ThemeShareWhereInput
    none?: ThemeShareWhereInput
  }

  export type GeneratedThemeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ThemeShareOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ThemeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    themeData?: SortOrder
    version?: SortOrder
    isDefault?: SortOrder
    organizationId?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ThemeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    isDefault?: SortOrder
    organizationId?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ThemeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    version?: SortOrder
    isDefault?: SortOrder
    organizationId?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumThemeVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemeVisibility | EnumThemeVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ThemeVisibility[] | ListEnumThemeVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ThemeVisibility[] | ListEnumThemeVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumThemeVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.ThemeVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumThemeVisibilityFilter<$PrismaModel>
    _max?: NestedEnumThemeVisibilityFilter<$PrismaModel>
  }

  export type EnumUserPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.UserPlan | EnumUserPlanFieldRefInput<$PrismaModel>
    in?: $Enums.UserPlan[] | ListEnumUserPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserPlan[] | ListEnumUserPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumUserPlanFilter<$PrismaModel> | $Enums.UserPlan
  }

  export type ThemeListRelationFilter = {
    every?: ThemeWhereInput
    some?: ThemeWhereInput
    none?: ThemeWhereInput
  }

  export type ColorPaletteListRelationFilter = {
    every?: ColorPaletteWhereInput
    some?: ColorPaletteWhereInput
    none?: ColorPaletteWhereInput
  }

  export type NeutralPaletteListRelationFilter = {
    every?: NeutralPaletteWhereInput
    some?: NeutralPaletteWhereInput
    none?: NeutralPaletteWhereInput
  }

  export type OrganizationMemberListRelationFilter = {
    every?: OrganizationMemberWhereInput
    some?: OrganizationMemberWhereInput
    none?: OrganizationMemberWhereInput
  }

  export type PurchaseNullableScalarRelationFilter = {
    is?: PurchaseWhereInput | null
    isNot?: PurchaseWhereInput | null
  }

  export type ThemeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ColorPaletteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NeutralPaletteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    plan?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    plan?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    plan?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUserPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserPlan | EnumUserPlanFieldRefInput<$PrismaModel>
    in?: $Enums.UserPlan[] | ListEnumUserPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserPlan[] | ListEnumUserPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumUserPlanWithAggregatesFilter<$PrismaModel> | $Enums.UserPlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserPlanFilter<$PrismaModel>
    _max?: NestedEnumUserPlanFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    clerkOrgId?: SortOrder
    name?: SortOrder
    seats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationAvgOrderByAggregateInput = {
    seats?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkOrgId?: SortOrder
    name?: SortOrder
    seats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    clerkOrgId?: SortOrder
    name?: SortOrder
    seats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationSumOrderByAggregateInput = {
    seats?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumOrganizationRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationRole | EnumOrganizationRoleFieldRefInput<$PrismaModel>
    in?: $Enums.OrganizationRole[] | ListEnumOrganizationRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrganizationRole[] | ListEnumOrganizationRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumOrganizationRoleFilter<$PrismaModel> | $Enums.OrganizationRole
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type OrganizationMemberOrganizationIdUserIdCompoundUniqueInput = {
    organizationId: string
    userId: string
  }

  export type OrganizationMemberCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationMemberMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumOrganizationRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationRole | EnumOrganizationRoleFieldRefInput<$PrismaModel>
    in?: $Enums.OrganizationRole[] | ListEnumOrganizationRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrganizationRole[] | ListEnumOrganizationRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumOrganizationRoleWithAggregatesFilter<$PrismaModel> | $Enums.OrganizationRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrganizationRoleFilter<$PrismaModel>
    _max?: NestedEnumOrganizationRoleFilter<$PrismaModel>
  }

  export type EnumPurchasePlanFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchasePlan | EnumPurchasePlanFieldRefInput<$PrismaModel>
    in?: $Enums.PurchasePlan[] | ListEnumPurchasePlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchasePlan[] | ListEnumPurchasePlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchasePlanFilter<$PrismaModel> | $Enums.PurchasePlan
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumPurchaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchaseStatus | EnumPurchaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PurchaseStatus[] | ListEnumPurchaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchaseStatus[] | ListEnumPurchaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchaseStatusFilter<$PrismaModel> | $Enums.PurchaseStatus
  }

  export type PurchaseCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    stripeCustomerId?: SortOrder
    stripePaymentId?: SortOrder
    stripePriceId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    plan?: SortOrder
    seats?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PurchaseAvgOrderByAggregateInput = {
    amount?: SortOrder
    seats?: SortOrder
  }

  export type PurchaseMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    stripeCustomerId?: SortOrder
    stripePaymentId?: SortOrder
    stripePriceId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    plan?: SortOrder
    seats?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PurchaseMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    stripeCustomerId?: SortOrder
    stripePaymentId?: SortOrder
    stripePriceId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    plan?: SortOrder
    seats?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PurchaseSumOrderByAggregateInput = {
    amount?: SortOrder
    seats?: SortOrder
  }

  export type EnumPurchasePlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchasePlan | EnumPurchasePlanFieldRefInput<$PrismaModel>
    in?: $Enums.PurchasePlan[] | ListEnumPurchasePlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchasePlan[] | ListEnumPurchasePlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchasePlanWithAggregatesFilter<$PrismaModel> | $Enums.PurchasePlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPurchasePlanFilter<$PrismaModel>
    _max?: NestedEnumPurchasePlanFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumPurchaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchaseStatus | EnumPurchaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PurchaseStatus[] | ListEnumPurchaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchaseStatus[] | ListEnumPurchaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.PurchaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPurchaseStatusFilter<$PrismaModel>
    _max?: NestedEnumPurchaseStatusFilter<$PrismaModel>
  }

  export type ThemeShareThemeIdSharedWithCompoundUniqueInput = {
    themeId: string
    sharedWith: string
  }

  export type ThemeShareCountOrderByAggregateInput = {
    id?: SortOrder
    themeId?: SortOrder
    sharedBy?: SortOrder
    sharedWith?: SortOrder
    createdAt?: SortOrder
  }

  export type ThemeShareMaxOrderByAggregateInput = {
    id?: SortOrder
    themeId?: SortOrder
    sharedBy?: SortOrder
    sharedWith?: SortOrder
    createdAt?: SortOrder
  }

  export type ThemeShareMinOrderByAggregateInput = {
    id?: SortOrder
    themeId?: SortOrder
    sharedBy?: SortOrder
    sharedWith?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutColorPalettesInput = {
    create?: XOR<UserCreateWithoutColorPalettesInput, UserUncheckedCreateWithoutColorPalettesInput>
    connectOrCreate?: UserCreateOrConnectWithoutColorPalettesInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutColorPalettesNestedInput = {
    create?: XOR<UserCreateWithoutColorPalettesInput, UserUncheckedCreateWithoutColorPalettesInput>
    connectOrCreate?: UserCreateOrConnectWithoutColorPalettesInput
    upsert?: UserUpsertWithoutColorPalettesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutColorPalettesInput, UserUpdateWithoutColorPalettesInput>, UserUncheckedUpdateWithoutColorPalettesInput>
  }

  export type ThemeCreateNestedOneWithoutGeneratedThemesInput = {
    create?: XOR<ThemeCreateWithoutGeneratedThemesInput, ThemeUncheckedCreateWithoutGeneratedThemesInput>
    connectOrCreate?: ThemeCreateOrConnectWithoutGeneratedThemesInput
    connect?: ThemeWhereUniqueInput
  }

  export type ThemeUpdateOneRequiredWithoutGeneratedThemesNestedInput = {
    create?: XOR<ThemeCreateWithoutGeneratedThemesInput, ThemeUncheckedCreateWithoutGeneratedThemesInput>
    connectOrCreate?: ThemeCreateOrConnectWithoutGeneratedThemesInput
    upsert?: ThemeUpsertWithoutGeneratedThemesInput
    connect?: ThemeWhereUniqueInput
    update?: XOR<XOR<ThemeUpdateToOneWithWhereWithoutGeneratedThemesInput, ThemeUpdateWithoutGeneratedThemesInput>, ThemeUncheckedUpdateWithoutGeneratedThemesInput>
  }

  export type UserCreateNestedOneWithoutNeutralPalettesInput = {
    create?: XOR<UserCreateWithoutNeutralPalettesInput, UserUncheckedCreateWithoutNeutralPalettesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNeutralPalettesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutNeutralPalettesNestedInput = {
    create?: XOR<UserCreateWithoutNeutralPalettesInput, UserUncheckedCreateWithoutNeutralPalettesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNeutralPalettesInput
    upsert?: UserUpsertWithoutNeutralPalettesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNeutralPalettesInput, UserUpdateWithoutNeutralPalettesInput>, UserUncheckedUpdateWithoutNeutralPalettesInput>
  }

  export type UserCreateNestedOneWithoutThemesInput = {
    create?: XOR<UserCreateWithoutThemesInput, UserUncheckedCreateWithoutThemesInput>
    connectOrCreate?: UserCreateOrConnectWithoutThemesInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutThemesInput = {
    create?: XOR<OrganizationCreateWithoutThemesInput, OrganizationUncheckedCreateWithoutThemesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutThemesInput
    connect?: OrganizationWhereUniqueInput
  }

  export type GeneratedThemeCreateNestedManyWithoutThemeInput = {
    create?: XOR<GeneratedThemeCreateWithoutThemeInput, GeneratedThemeUncheckedCreateWithoutThemeInput> | GeneratedThemeCreateWithoutThemeInput[] | GeneratedThemeUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: GeneratedThemeCreateOrConnectWithoutThemeInput | GeneratedThemeCreateOrConnectWithoutThemeInput[]
    createMany?: GeneratedThemeCreateManyThemeInputEnvelope
    connect?: GeneratedThemeWhereUniqueInput | GeneratedThemeWhereUniqueInput[]
  }

  export type ThemeShareCreateNestedManyWithoutThemeInput = {
    create?: XOR<ThemeShareCreateWithoutThemeInput, ThemeShareUncheckedCreateWithoutThemeInput> | ThemeShareCreateWithoutThemeInput[] | ThemeShareUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: ThemeShareCreateOrConnectWithoutThemeInput | ThemeShareCreateOrConnectWithoutThemeInput[]
    createMany?: ThemeShareCreateManyThemeInputEnvelope
    connect?: ThemeShareWhereUniqueInput | ThemeShareWhereUniqueInput[]
  }

  export type GeneratedThemeUncheckedCreateNestedManyWithoutThemeInput = {
    create?: XOR<GeneratedThemeCreateWithoutThemeInput, GeneratedThemeUncheckedCreateWithoutThemeInput> | GeneratedThemeCreateWithoutThemeInput[] | GeneratedThemeUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: GeneratedThemeCreateOrConnectWithoutThemeInput | GeneratedThemeCreateOrConnectWithoutThemeInput[]
    createMany?: GeneratedThemeCreateManyThemeInputEnvelope
    connect?: GeneratedThemeWhereUniqueInput | GeneratedThemeWhereUniqueInput[]
  }

  export type ThemeShareUncheckedCreateNestedManyWithoutThemeInput = {
    create?: XOR<ThemeShareCreateWithoutThemeInput, ThemeShareUncheckedCreateWithoutThemeInput> | ThemeShareCreateWithoutThemeInput[] | ThemeShareUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: ThemeShareCreateOrConnectWithoutThemeInput | ThemeShareCreateOrConnectWithoutThemeInput[]
    createMany?: ThemeShareCreateManyThemeInputEnvelope
    connect?: ThemeShareWhereUniqueInput | ThemeShareWhereUniqueInput[]
  }

  export type EnumThemeVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.ThemeVisibility
  }

  export type UserUpdateOneRequiredWithoutThemesNestedInput = {
    create?: XOR<UserCreateWithoutThemesInput, UserUncheckedCreateWithoutThemesInput>
    connectOrCreate?: UserCreateOrConnectWithoutThemesInput
    upsert?: UserUpsertWithoutThemesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutThemesInput, UserUpdateWithoutThemesInput>, UserUncheckedUpdateWithoutThemesInput>
  }

  export type OrganizationUpdateOneWithoutThemesNestedInput = {
    create?: XOR<OrganizationCreateWithoutThemesInput, OrganizationUncheckedCreateWithoutThemesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutThemesInput
    upsert?: OrganizationUpsertWithoutThemesInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutThemesInput, OrganizationUpdateWithoutThemesInput>, OrganizationUncheckedUpdateWithoutThemesInput>
  }

  export type GeneratedThemeUpdateManyWithoutThemeNestedInput = {
    create?: XOR<GeneratedThemeCreateWithoutThemeInput, GeneratedThemeUncheckedCreateWithoutThemeInput> | GeneratedThemeCreateWithoutThemeInput[] | GeneratedThemeUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: GeneratedThemeCreateOrConnectWithoutThemeInput | GeneratedThemeCreateOrConnectWithoutThemeInput[]
    upsert?: GeneratedThemeUpsertWithWhereUniqueWithoutThemeInput | GeneratedThemeUpsertWithWhereUniqueWithoutThemeInput[]
    createMany?: GeneratedThemeCreateManyThemeInputEnvelope
    set?: GeneratedThemeWhereUniqueInput | GeneratedThemeWhereUniqueInput[]
    disconnect?: GeneratedThemeWhereUniqueInput | GeneratedThemeWhereUniqueInput[]
    delete?: GeneratedThemeWhereUniqueInput | GeneratedThemeWhereUniqueInput[]
    connect?: GeneratedThemeWhereUniqueInput | GeneratedThemeWhereUniqueInput[]
    update?: GeneratedThemeUpdateWithWhereUniqueWithoutThemeInput | GeneratedThemeUpdateWithWhereUniqueWithoutThemeInput[]
    updateMany?: GeneratedThemeUpdateManyWithWhereWithoutThemeInput | GeneratedThemeUpdateManyWithWhereWithoutThemeInput[]
    deleteMany?: GeneratedThemeScalarWhereInput | GeneratedThemeScalarWhereInput[]
  }

  export type ThemeShareUpdateManyWithoutThemeNestedInput = {
    create?: XOR<ThemeShareCreateWithoutThemeInput, ThemeShareUncheckedCreateWithoutThemeInput> | ThemeShareCreateWithoutThemeInput[] | ThemeShareUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: ThemeShareCreateOrConnectWithoutThemeInput | ThemeShareCreateOrConnectWithoutThemeInput[]
    upsert?: ThemeShareUpsertWithWhereUniqueWithoutThemeInput | ThemeShareUpsertWithWhereUniqueWithoutThemeInput[]
    createMany?: ThemeShareCreateManyThemeInputEnvelope
    set?: ThemeShareWhereUniqueInput | ThemeShareWhereUniqueInput[]
    disconnect?: ThemeShareWhereUniqueInput | ThemeShareWhereUniqueInput[]
    delete?: ThemeShareWhereUniqueInput | ThemeShareWhereUniqueInput[]
    connect?: ThemeShareWhereUniqueInput | ThemeShareWhereUniqueInput[]
    update?: ThemeShareUpdateWithWhereUniqueWithoutThemeInput | ThemeShareUpdateWithWhereUniqueWithoutThemeInput[]
    updateMany?: ThemeShareUpdateManyWithWhereWithoutThemeInput | ThemeShareUpdateManyWithWhereWithoutThemeInput[]
    deleteMany?: ThemeShareScalarWhereInput | ThemeShareScalarWhereInput[]
  }

  export type GeneratedThemeUncheckedUpdateManyWithoutThemeNestedInput = {
    create?: XOR<GeneratedThemeCreateWithoutThemeInput, GeneratedThemeUncheckedCreateWithoutThemeInput> | GeneratedThemeCreateWithoutThemeInput[] | GeneratedThemeUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: GeneratedThemeCreateOrConnectWithoutThemeInput | GeneratedThemeCreateOrConnectWithoutThemeInput[]
    upsert?: GeneratedThemeUpsertWithWhereUniqueWithoutThemeInput | GeneratedThemeUpsertWithWhereUniqueWithoutThemeInput[]
    createMany?: GeneratedThemeCreateManyThemeInputEnvelope
    set?: GeneratedThemeWhereUniqueInput | GeneratedThemeWhereUniqueInput[]
    disconnect?: GeneratedThemeWhereUniqueInput | GeneratedThemeWhereUniqueInput[]
    delete?: GeneratedThemeWhereUniqueInput | GeneratedThemeWhereUniqueInput[]
    connect?: GeneratedThemeWhereUniqueInput | GeneratedThemeWhereUniqueInput[]
    update?: GeneratedThemeUpdateWithWhereUniqueWithoutThemeInput | GeneratedThemeUpdateWithWhereUniqueWithoutThemeInput[]
    updateMany?: GeneratedThemeUpdateManyWithWhereWithoutThemeInput | GeneratedThemeUpdateManyWithWhereWithoutThemeInput[]
    deleteMany?: GeneratedThemeScalarWhereInput | GeneratedThemeScalarWhereInput[]
  }

  export type ThemeShareUncheckedUpdateManyWithoutThemeNestedInput = {
    create?: XOR<ThemeShareCreateWithoutThemeInput, ThemeShareUncheckedCreateWithoutThemeInput> | ThemeShareCreateWithoutThemeInput[] | ThemeShareUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: ThemeShareCreateOrConnectWithoutThemeInput | ThemeShareCreateOrConnectWithoutThemeInput[]
    upsert?: ThemeShareUpsertWithWhereUniqueWithoutThemeInput | ThemeShareUpsertWithWhereUniqueWithoutThemeInput[]
    createMany?: ThemeShareCreateManyThemeInputEnvelope
    set?: ThemeShareWhereUniqueInput | ThemeShareWhereUniqueInput[]
    disconnect?: ThemeShareWhereUniqueInput | ThemeShareWhereUniqueInput[]
    delete?: ThemeShareWhereUniqueInput | ThemeShareWhereUniqueInput[]
    connect?: ThemeShareWhereUniqueInput | ThemeShareWhereUniqueInput[]
    update?: ThemeShareUpdateWithWhereUniqueWithoutThemeInput | ThemeShareUpdateWithWhereUniqueWithoutThemeInput[]
    updateMany?: ThemeShareUpdateManyWithWhereWithoutThemeInput | ThemeShareUpdateManyWithWhereWithoutThemeInput[]
    deleteMany?: ThemeShareScalarWhereInput | ThemeShareScalarWhereInput[]
  }

  export type ThemeCreateNestedManyWithoutUserInput = {
    create?: XOR<ThemeCreateWithoutUserInput, ThemeUncheckedCreateWithoutUserInput> | ThemeCreateWithoutUserInput[] | ThemeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutUserInput | ThemeCreateOrConnectWithoutUserInput[]
    createMany?: ThemeCreateManyUserInputEnvelope
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
  }

  export type ColorPaletteCreateNestedManyWithoutUserInput = {
    create?: XOR<ColorPaletteCreateWithoutUserInput, ColorPaletteUncheckedCreateWithoutUserInput> | ColorPaletteCreateWithoutUserInput[] | ColorPaletteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ColorPaletteCreateOrConnectWithoutUserInput | ColorPaletteCreateOrConnectWithoutUserInput[]
    createMany?: ColorPaletteCreateManyUserInputEnvelope
    connect?: ColorPaletteWhereUniqueInput | ColorPaletteWhereUniqueInput[]
  }

  export type NeutralPaletteCreateNestedManyWithoutUserInput = {
    create?: XOR<NeutralPaletteCreateWithoutUserInput, NeutralPaletteUncheckedCreateWithoutUserInput> | NeutralPaletteCreateWithoutUserInput[] | NeutralPaletteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NeutralPaletteCreateOrConnectWithoutUserInput | NeutralPaletteCreateOrConnectWithoutUserInput[]
    createMany?: NeutralPaletteCreateManyUserInputEnvelope
    connect?: NeutralPaletteWhereUniqueInput | NeutralPaletteWhereUniqueInput[]
  }

  export type OrganizationMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<OrganizationMemberCreateWithoutUserInput, OrganizationMemberUncheckedCreateWithoutUserInput> | OrganizationMemberCreateWithoutUserInput[] | OrganizationMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrganizationMemberCreateOrConnectWithoutUserInput | OrganizationMemberCreateOrConnectWithoutUserInput[]
    createMany?: OrganizationMemberCreateManyUserInputEnvelope
    connect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
  }

  export type PurchaseCreateNestedOneWithoutUserInput = {
    create?: XOR<PurchaseCreateWithoutUserInput, PurchaseUncheckedCreateWithoutUserInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutUserInput
    connect?: PurchaseWhereUniqueInput
  }

  export type ThemeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ThemeCreateWithoutUserInput, ThemeUncheckedCreateWithoutUserInput> | ThemeCreateWithoutUserInput[] | ThemeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutUserInput | ThemeCreateOrConnectWithoutUserInput[]
    createMany?: ThemeCreateManyUserInputEnvelope
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
  }

  export type ColorPaletteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ColorPaletteCreateWithoutUserInput, ColorPaletteUncheckedCreateWithoutUserInput> | ColorPaletteCreateWithoutUserInput[] | ColorPaletteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ColorPaletteCreateOrConnectWithoutUserInput | ColorPaletteCreateOrConnectWithoutUserInput[]
    createMany?: ColorPaletteCreateManyUserInputEnvelope
    connect?: ColorPaletteWhereUniqueInput | ColorPaletteWhereUniqueInput[]
  }

  export type NeutralPaletteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NeutralPaletteCreateWithoutUserInput, NeutralPaletteUncheckedCreateWithoutUserInput> | NeutralPaletteCreateWithoutUserInput[] | NeutralPaletteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NeutralPaletteCreateOrConnectWithoutUserInput | NeutralPaletteCreateOrConnectWithoutUserInput[]
    createMany?: NeutralPaletteCreateManyUserInputEnvelope
    connect?: NeutralPaletteWhereUniqueInput | NeutralPaletteWhereUniqueInput[]
  }

  export type OrganizationMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrganizationMemberCreateWithoutUserInput, OrganizationMemberUncheckedCreateWithoutUserInput> | OrganizationMemberCreateWithoutUserInput[] | OrganizationMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrganizationMemberCreateOrConnectWithoutUserInput | OrganizationMemberCreateOrConnectWithoutUserInput[]
    createMany?: OrganizationMemberCreateManyUserInputEnvelope
    connect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
  }

  export type PurchaseUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PurchaseCreateWithoutUserInput, PurchaseUncheckedCreateWithoutUserInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutUserInput
    connect?: PurchaseWhereUniqueInput
  }

  export type EnumUserPlanFieldUpdateOperationsInput = {
    set?: $Enums.UserPlan
  }

  export type ThemeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ThemeCreateWithoutUserInput, ThemeUncheckedCreateWithoutUserInput> | ThemeCreateWithoutUserInput[] | ThemeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutUserInput | ThemeCreateOrConnectWithoutUserInput[]
    upsert?: ThemeUpsertWithWhereUniqueWithoutUserInput | ThemeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ThemeCreateManyUserInputEnvelope
    set?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    disconnect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    delete?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    update?: ThemeUpdateWithWhereUniqueWithoutUserInput | ThemeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ThemeUpdateManyWithWhereWithoutUserInput | ThemeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ThemeScalarWhereInput | ThemeScalarWhereInput[]
  }

  export type ColorPaletteUpdateManyWithoutUserNestedInput = {
    create?: XOR<ColorPaletteCreateWithoutUserInput, ColorPaletteUncheckedCreateWithoutUserInput> | ColorPaletteCreateWithoutUserInput[] | ColorPaletteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ColorPaletteCreateOrConnectWithoutUserInput | ColorPaletteCreateOrConnectWithoutUserInput[]
    upsert?: ColorPaletteUpsertWithWhereUniqueWithoutUserInput | ColorPaletteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ColorPaletteCreateManyUserInputEnvelope
    set?: ColorPaletteWhereUniqueInput | ColorPaletteWhereUniqueInput[]
    disconnect?: ColorPaletteWhereUniqueInput | ColorPaletteWhereUniqueInput[]
    delete?: ColorPaletteWhereUniqueInput | ColorPaletteWhereUniqueInput[]
    connect?: ColorPaletteWhereUniqueInput | ColorPaletteWhereUniqueInput[]
    update?: ColorPaletteUpdateWithWhereUniqueWithoutUserInput | ColorPaletteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ColorPaletteUpdateManyWithWhereWithoutUserInput | ColorPaletteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ColorPaletteScalarWhereInput | ColorPaletteScalarWhereInput[]
  }

  export type NeutralPaletteUpdateManyWithoutUserNestedInput = {
    create?: XOR<NeutralPaletteCreateWithoutUserInput, NeutralPaletteUncheckedCreateWithoutUserInput> | NeutralPaletteCreateWithoutUserInput[] | NeutralPaletteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NeutralPaletteCreateOrConnectWithoutUserInput | NeutralPaletteCreateOrConnectWithoutUserInput[]
    upsert?: NeutralPaletteUpsertWithWhereUniqueWithoutUserInput | NeutralPaletteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NeutralPaletteCreateManyUserInputEnvelope
    set?: NeutralPaletteWhereUniqueInput | NeutralPaletteWhereUniqueInput[]
    disconnect?: NeutralPaletteWhereUniqueInput | NeutralPaletteWhereUniqueInput[]
    delete?: NeutralPaletteWhereUniqueInput | NeutralPaletteWhereUniqueInput[]
    connect?: NeutralPaletteWhereUniqueInput | NeutralPaletteWhereUniqueInput[]
    update?: NeutralPaletteUpdateWithWhereUniqueWithoutUserInput | NeutralPaletteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NeutralPaletteUpdateManyWithWhereWithoutUserInput | NeutralPaletteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NeutralPaletteScalarWhereInput | NeutralPaletteScalarWhereInput[]
  }

  export type OrganizationMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrganizationMemberCreateWithoutUserInput, OrganizationMemberUncheckedCreateWithoutUserInput> | OrganizationMemberCreateWithoutUserInput[] | OrganizationMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrganizationMemberCreateOrConnectWithoutUserInput | OrganizationMemberCreateOrConnectWithoutUserInput[]
    upsert?: OrganizationMemberUpsertWithWhereUniqueWithoutUserInput | OrganizationMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrganizationMemberCreateManyUserInputEnvelope
    set?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    disconnect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    delete?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    connect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    update?: OrganizationMemberUpdateWithWhereUniqueWithoutUserInput | OrganizationMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrganizationMemberUpdateManyWithWhereWithoutUserInput | OrganizationMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrganizationMemberScalarWhereInput | OrganizationMemberScalarWhereInput[]
  }

  export type PurchaseUpdateOneWithoutUserNestedInput = {
    create?: XOR<PurchaseCreateWithoutUserInput, PurchaseUncheckedCreateWithoutUserInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutUserInput
    upsert?: PurchaseUpsertWithoutUserInput
    disconnect?: PurchaseWhereInput | boolean
    delete?: PurchaseWhereInput | boolean
    connect?: PurchaseWhereUniqueInput
    update?: XOR<XOR<PurchaseUpdateToOneWithWhereWithoutUserInput, PurchaseUpdateWithoutUserInput>, PurchaseUncheckedUpdateWithoutUserInput>
  }

  export type ThemeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ThemeCreateWithoutUserInput, ThemeUncheckedCreateWithoutUserInput> | ThemeCreateWithoutUserInput[] | ThemeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutUserInput | ThemeCreateOrConnectWithoutUserInput[]
    upsert?: ThemeUpsertWithWhereUniqueWithoutUserInput | ThemeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ThemeCreateManyUserInputEnvelope
    set?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    disconnect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    delete?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    update?: ThemeUpdateWithWhereUniqueWithoutUserInput | ThemeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ThemeUpdateManyWithWhereWithoutUserInput | ThemeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ThemeScalarWhereInput | ThemeScalarWhereInput[]
  }

  export type ColorPaletteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ColorPaletteCreateWithoutUserInput, ColorPaletteUncheckedCreateWithoutUserInput> | ColorPaletteCreateWithoutUserInput[] | ColorPaletteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ColorPaletteCreateOrConnectWithoutUserInput | ColorPaletteCreateOrConnectWithoutUserInput[]
    upsert?: ColorPaletteUpsertWithWhereUniqueWithoutUserInput | ColorPaletteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ColorPaletteCreateManyUserInputEnvelope
    set?: ColorPaletteWhereUniqueInput | ColorPaletteWhereUniqueInput[]
    disconnect?: ColorPaletteWhereUniqueInput | ColorPaletteWhereUniqueInput[]
    delete?: ColorPaletteWhereUniqueInput | ColorPaletteWhereUniqueInput[]
    connect?: ColorPaletteWhereUniqueInput | ColorPaletteWhereUniqueInput[]
    update?: ColorPaletteUpdateWithWhereUniqueWithoutUserInput | ColorPaletteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ColorPaletteUpdateManyWithWhereWithoutUserInput | ColorPaletteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ColorPaletteScalarWhereInput | ColorPaletteScalarWhereInput[]
  }

  export type NeutralPaletteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NeutralPaletteCreateWithoutUserInput, NeutralPaletteUncheckedCreateWithoutUserInput> | NeutralPaletteCreateWithoutUserInput[] | NeutralPaletteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NeutralPaletteCreateOrConnectWithoutUserInput | NeutralPaletteCreateOrConnectWithoutUserInput[]
    upsert?: NeutralPaletteUpsertWithWhereUniqueWithoutUserInput | NeutralPaletteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NeutralPaletteCreateManyUserInputEnvelope
    set?: NeutralPaletteWhereUniqueInput | NeutralPaletteWhereUniqueInput[]
    disconnect?: NeutralPaletteWhereUniqueInput | NeutralPaletteWhereUniqueInput[]
    delete?: NeutralPaletteWhereUniqueInput | NeutralPaletteWhereUniqueInput[]
    connect?: NeutralPaletteWhereUniqueInput | NeutralPaletteWhereUniqueInput[]
    update?: NeutralPaletteUpdateWithWhereUniqueWithoutUserInput | NeutralPaletteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NeutralPaletteUpdateManyWithWhereWithoutUserInput | NeutralPaletteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NeutralPaletteScalarWhereInput | NeutralPaletteScalarWhereInput[]
  }

  export type OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrganizationMemberCreateWithoutUserInput, OrganizationMemberUncheckedCreateWithoutUserInput> | OrganizationMemberCreateWithoutUserInput[] | OrganizationMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrganizationMemberCreateOrConnectWithoutUserInput | OrganizationMemberCreateOrConnectWithoutUserInput[]
    upsert?: OrganizationMemberUpsertWithWhereUniqueWithoutUserInput | OrganizationMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrganizationMemberCreateManyUserInputEnvelope
    set?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    disconnect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    delete?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    connect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    update?: OrganizationMemberUpdateWithWhereUniqueWithoutUserInput | OrganizationMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrganizationMemberUpdateManyWithWhereWithoutUserInput | OrganizationMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrganizationMemberScalarWhereInput | OrganizationMemberScalarWhereInput[]
  }

  export type PurchaseUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PurchaseCreateWithoutUserInput, PurchaseUncheckedCreateWithoutUserInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutUserInput
    upsert?: PurchaseUpsertWithoutUserInput
    disconnect?: PurchaseWhereInput | boolean
    delete?: PurchaseWhereInput | boolean
    connect?: PurchaseWhereUniqueInput
    update?: XOR<XOR<PurchaseUpdateToOneWithWhereWithoutUserInput, PurchaseUpdateWithoutUserInput>, PurchaseUncheckedUpdateWithoutUserInput>
  }

  export type OrganizationMemberCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationMemberCreateWithoutOrganizationInput, OrganizationMemberUncheckedCreateWithoutOrganizationInput> | OrganizationMemberCreateWithoutOrganizationInput[] | OrganizationMemberUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationMemberCreateOrConnectWithoutOrganizationInput | OrganizationMemberCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationMemberCreateManyOrganizationInputEnvelope
    connect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
  }

  export type ThemeCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ThemeCreateWithoutOrganizationInput, ThemeUncheckedCreateWithoutOrganizationInput> | ThemeCreateWithoutOrganizationInput[] | ThemeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutOrganizationInput | ThemeCreateOrConnectWithoutOrganizationInput[]
    createMany?: ThemeCreateManyOrganizationInputEnvelope
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
  }

  export type PurchaseCreateNestedOneWithoutOrganizationInput = {
    create?: XOR<PurchaseCreateWithoutOrganizationInput, PurchaseUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutOrganizationInput
    connect?: PurchaseWhereUniqueInput
  }

  export type OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationMemberCreateWithoutOrganizationInput, OrganizationMemberUncheckedCreateWithoutOrganizationInput> | OrganizationMemberCreateWithoutOrganizationInput[] | OrganizationMemberUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationMemberCreateOrConnectWithoutOrganizationInput | OrganizationMemberCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationMemberCreateManyOrganizationInputEnvelope
    connect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
  }

  export type ThemeUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ThemeCreateWithoutOrganizationInput, ThemeUncheckedCreateWithoutOrganizationInput> | ThemeCreateWithoutOrganizationInput[] | ThemeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutOrganizationInput | ThemeCreateOrConnectWithoutOrganizationInput[]
    createMany?: ThemeCreateManyOrganizationInputEnvelope
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
  }

  export type PurchaseUncheckedCreateNestedOneWithoutOrganizationInput = {
    create?: XOR<PurchaseCreateWithoutOrganizationInput, PurchaseUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutOrganizationInput
    connect?: PurchaseWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrganizationMemberUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationMemberCreateWithoutOrganizationInput, OrganizationMemberUncheckedCreateWithoutOrganizationInput> | OrganizationMemberCreateWithoutOrganizationInput[] | OrganizationMemberUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationMemberCreateOrConnectWithoutOrganizationInput | OrganizationMemberCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationMemberCreateManyOrganizationInputEnvelope
    set?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    disconnect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    delete?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    connect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    update?: OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput | OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationMemberScalarWhereInput | OrganizationMemberScalarWhereInput[]
  }

  export type ThemeUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ThemeCreateWithoutOrganizationInput, ThemeUncheckedCreateWithoutOrganizationInput> | ThemeCreateWithoutOrganizationInput[] | ThemeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutOrganizationInput | ThemeCreateOrConnectWithoutOrganizationInput[]
    upsert?: ThemeUpsertWithWhereUniqueWithoutOrganizationInput | ThemeUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ThemeCreateManyOrganizationInputEnvelope
    set?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    disconnect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    delete?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    update?: ThemeUpdateWithWhereUniqueWithoutOrganizationInput | ThemeUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ThemeUpdateManyWithWhereWithoutOrganizationInput | ThemeUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ThemeScalarWhereInput | ThemeScalarWhereInput[]
  }

  export type PurchaseUpdateOneWithoutOrganizationNestedInput = {
    create?: XOR<PurchaseCreateWithoutOrganizationInput, PurchaseUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutOrganizationInput
    upsert?: PurchaseUpsertWithoutOrganizationInput
    disconnect?: PurchaseWhereInput | boolean
    delete?: PurchaseWhereInput | boolean
    connect?: PurchaseWhereUniqueInput
    update?: XOR<XOR<PurchaseUpdateToOneWithWhereWithoutOrganizationInput, PurchaseUpdateWithoutOrganizationInput>, PurchaseUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationMemberCreateWithoutOrganizationInput, OrganizationMemberUncheckedCreateWithoutOrganizationInput> | OrganizationMemberCreateWithoutOrganizationInput[] | OrganizationMemberUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationMemberCreateOrConnectWithoutOrganizationInput | OrganizationMemberCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationMemberCreateManyOrganizationInputEnvelope
    set?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    disconnect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    delete?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    connect?: OrganizationMemberWhereUniqueInput | OrganizationMemberWhereUniqueInput[]
    update?: OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput | OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationMemberScalarWhereInput | OrganizationMemberScalarWhereInput[]
  }

  export type ThemeUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ThemeCreateWithoutOrganizationInput, ThemeUncheckedCreateWithoutOrganizationInput> | ThemeCreateWithoutOrganizationInput[] | ThemeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutOrganizationInput | ThemeCreateOrConnectWithoutOrganizationInput[]
    upsert?: ThemeUpsertWithWhereUniqueWithoutOrganizationInput | ThemeUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ThemeCreateManyOrganizationInputEnvelope
    set?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    disconnect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    delete?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    update?: ThemeUpdateWithWhereUniqueWithoutOrganizationInput | ThemeUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ThemeUpdateManyWithWhereWithoutOrganizationInput | ThemeUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ThemeScalarWhereInput | ThemeScalarWhereInput[]
  }

  export type PurchaseUncheckedUpdateOneWithoutOrganizationNestedInput = {
    create?: XOR<PurchaseCreateWithoutOrganizationInput, PurchaseUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutOrganizationInput
    upsert?: PurchaseUpsertWithoutOrganizationInput
    disconnect?: PurchaseWhereInput | boolean
    delete?: PurchaseWhereInput | boolean
    connect?: PurchaseWhereUniqueInput
    update?: XOR<XOR<PurchaseUpdateToOneWithWhereWithoutOrganizationInput, PurchaseUpdateWithoutOrganizationInput>, PurchaseUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationCreateNestedOneWithoutMembersInput = {
    create?: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutMembersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOrganizationMembershipsInput = {
    create?: XOR<UserCreateWithoutOrganizationMembershipsInput, UserUncheckedCreateWithoutOrganizationMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumOrganizationRoleFieldUpdateOperationsInput = {
    set?: $Enums.OrganizationRole
  }

  export type OrganizationUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutMembersInput
    upsert?: OrganizationUpsertWithoutMembersInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutMembersInput, OrganizationUpdateWithoutMembersInput>, OrganizationUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutOrganizationMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationMembershipsInput, UserUncheckedCreateWithoutOrganizationMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationMembershipsInput
    upsert?: UserUpsertWithoutOrganizationMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrganizationMembershipsInput, UserUpdateWithoutOrganizationMembershipsInput>, UserUncheckedUpdateWithoutOrganizationMembershipsInput>
  }

  export type UserCreateNestedOneWithoutPurchaseInput = {
    create?: XOR<UserCreateWithoutPurchaseInput, UserUncheckedCreateWithoutPurchaseInput>
    connectOrCreate?: UserCreateOrConnectWithoutPurchaseInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutPurchaseInput = {
    create?: XOR<OrganizationCreateWithoutPurchaseInput, OrganizationUncheckedCreateWithoutPurchaseInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutPurchaseInput
    connect?: OrganizationWhereUniqueInput
  }

  export type EnumPurchasePlanFieldUpdateOperationsInput = {
    set?: $Enums.PurchasePlan
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPurchaseStatusFieldUpdateOperationsInput = {
    set?: $Enums.PurchaseStatus
  }

  export type UserUpdateOneWithoutPurchaseNestedInput = {
    create?: XOR<UserCreateWithoutPurchaseInput, UserUncheckedCreateWithoutPurchaseInput>
    connectOrCreate?: UserCreateOrConnectWithoutPurchaseInput
    upsert?: UserUpsertWithoutPurchaseInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPurchaseInput, UserUpdateWithoutPurchaseInput>, UserUncheckedUpdateWithoutPurchaseInput>
  }

  export type OrganizationUpdateOneWithoutPurchaseNestedInput = {
    create?: XOR<OrganizationCreateWithoutPurchaseInput, OrganizationUncheckedCreateWithoutPurchaseInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutPurchaseInput
    upsert?: OrganizationUpsertWithoutPurchaseInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutPurchaseInput, OrganizationUpdateWithoutPurchaseInput>, OrganizationUncheckedUpdateWithoutPurchaseInput>
  }

  export type ThemeCreateNestedOneWithoutSharedWithInput = {
    create?: XOR<ThemeCreateWithoutSharedWithInput, ThemeUncheckedCreateWithoutSharedWithInput>
    connectOrCreate?: ThemeCreateOrConnectWithoutSharedWithInput
    connect?: ThemeWhereUniqueInput
  }

  export type ThemeUpdateOneRequiredWithoutSharedWithNestedInput = {
    create?: XOR<ThemeCreateWithoutSharedWithInput, ThemeUncheckedCreateWithoutSharedWithInput>
    connectOrCreate?: ThemeCreateOrConnectWithoutSharedWithInput
    upsert?: ThemeUpsertWithoutSharedWithInput
    connect?: ThemeWhereUniqueInput
    update?: XOR<XOR<ThemeUpdateToOneWithWhereWithoutSharedWithInput, ThemeUpdateWithoutSharedWithInput>, ThemeUncheckedUpdateWithoutSharedWithInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumThemeVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemeVisibility | EnumThemeVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ThemeVisibility[] | ListEnumThemeVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ThemeVisibility[] | ListEnumThemeVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumThemeVisibilityFilter<$PrismaModel> | $Enums.ThemeVisibility
  }

  export type NestedEnumThemeVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemeVisibility | EnumThemeVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ThemeVisibility[] | ListEnumThemeVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.ThemeVisibility[] | ListEnumThemeVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumThemeVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.ThemeVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumThemeVisibilityFilter<$PrismaModel>
    _max?: NestedEnumThemeVisibilityFilter<$PrismaModel>
  }

  export type NestedEnumUserPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.UserPlan | EnumUserPlanFieldRefInput<$PrismaModel>
    in?: $Enums.UserPlan[] | ListEnumUserPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserPlan[] | ListEnumUserPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumUserPlanFilter<$PrismaModel> | $Enums.UserPlan
  }

  export type NestedEnumUserPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserPlan | EnumUserPlanFieldRefInput<$PrismaModel>
    in?: $Enums.UserPlan[] | ListEnumUserPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserPlan[] | ListEnumUserPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumUserPlanWithAggregatesFilter<$PrismaModel> | $Enums.UserPlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserPlanFilter<$PrismaModel>
    _max?: NestedEnumUserPlanFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumOrganizationRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationRole | EnumOrganizationRoleFieldRefInput<$PrismaModel>
    in?: $Enums.OrganizationRole[] | ListEnumOrganizationRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrganizationRole[] | ListEnumOrganizationRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumOrganizationRoleFilter<$PrismaModel> | $Enums.OrganizationRole
  }

  export type NestedEnumOrganizationRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationRole | EnumOrganizationRoleFieldRefInput<$PrismaModel>
    in?: $Enums.OrganizationRole[] | ListEnumOrganizationRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrganizationRole[] | ListEnumOrganizationRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumOrganizationRoleWithAggregatesFilter<$PrismaModel> | $Enums.OrganizationRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrganizationRoleFilter<$PrismaModel>
    _max?: NestedEnumOrganizationRoleFilter<$PrismaModel>
  }

  export type NestedEnumPurchasePlanFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchasePlan | EnumPurchasePlanFieldRefInput<$PrismaModel>
    in?: $Enums.PurchasePlan[] | ListEnumPurchasePlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchasePlan[] | ListEnumPurchasePlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchasePlanFilter<$PrismaModel> | $Enums.PurchasePlan
  }

  export type NestedEnumPurchaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchaseStatus | EnumPurchaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PurchaseStatus[] | ListEnumPurchaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchaseStatus[] | ListEnumPurchaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchaseStatusFilter<$PrismaModel> | $Enums.PurchaseStatus
  }

  export type NestedEnumPurchasePlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchasePlan | EnumPurchasePlanFieldRefInput<$PrismaModel>
    in?: $Enums.PurchasePlan[] | ListEnumPurchasePlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchasePlan[] | ListEnumPurchasePlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchasePlanWithAggregatesFilter<$PrismaModel> | $Enums.PurchasePlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPurchasePlanFilter<$PrismaModel>
    _max?: NestedEnumPurchasePlanFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPurchaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchaseStatus | EnumPurchaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PurchaseStatus[] | ListEnumPurchaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchaseStatus[] | ListEnumPurchaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.PurchaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPurchaseStatusFilter<$PrismaModel>
    _max?: NestedEnumPurchaseStatusFilter<$PrismaModel>
  }

  export type UserCreateWithoutColorPalettesInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeCreateNestedManyWithoutUserInput
    neutralPalettes?: NeutralPaletteCreateNestedManyWithoutUserInput
    organizationMemberships?: OrganizationMemberCreateNestedManyWithoutUserInput
    purchase?: PurchaseCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutColorPalettesInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeUncheckedCreateNestedManyWithoutUserInput
    neutralPalettes?: NeutralPaletteUncheckedCreateNestedManyWithoutUserInput
    organizationMemberships?: OrganizationMemberUncheckedCreateNestedManyWithoutUserInput
    purchase?: PurchaseUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutColorPalettesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutColorPalettesInput, UserUncheckedCreateWithoutColorPalettesInput>
  }

  export type UserUpsertWithoutColorPalettesInput = {
    update: XOR<UserUpdateWithoutColorPalettesInput, UserUncheckedUpdateWithoutColorPalettesInput>
    create: XOR<UserCreateWithoutColorPalettesInput, UserUncheckedCreateWithoutColorPalettesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutColorPalettesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutColorPalettesInput, UserUncheckedUpdateWithoutColorPalettesInput>
  }

  export type UserUpdateWithoutColorPalettesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUpdateManyWithoutUserNestedInput
    neutralPalettes?: NeutralPaletteUpdateManyWithoutUserNestedInput
    organizationMemberships?: OrganizationMemberUpdateManyWithoutUserNestedInput
    purchase?: PurchaseUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutColorPalettesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUncheckedUpdateManyWithoutUserNestedInput
    neutralPalettes?: NeutralPaletteUncheckedUpdateManyWithoutUserNestedInput
    organizationMemberships?: OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput
    purchase?: PurchaseUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ThemeCreateWithoutGeneratedThemesInput = {
    id?: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutThemesInput
    organization?: OrganizationCreateNestedOneWithoutThemesInput
    sharedWith?: ThemeShareCreateNestedManyWithoutThemeInput
  }

  export type ThemeUncheckedCreateWithoutGeneratedThemesInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    organizationId?: string | null
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
    sharedWith?: ThemeShareUncheckedCreateNestedManyWithoutThemeInput
  }

  export type ThemeCreateOrConnectWithoutGeneratedThemesInput = {
    where: ThemeWhereUniqueInput
    create: XOR<ThemeCreateWithoutGeneratedThemesInput, ThemeUncheckedCreateWithoutGeneratedThemesInput>
  }

  export type ThemeUpsertWithoutGeneratedThemesInput = {
    update: XOR<ThemeUpdateWithoutGeneratedThemesInput, ThemeUncheckedUpdateWithoutGeneratedThemesInput>
    create: XOR<ThemeCreateWithoutGeneratedThemesInput, ThemeUncheckedCreateWithoutGeneratedThemesInput>
    where?: ThemeWhereInput
  }

  export type ThemeUpdateToOneWithWhereWithoutGeneratedThemesInput = {
    where?: ThemeWhereInput
    data: XOR<ThemeUpdateWithoutGeneratedThemesInput, ThemeUncheckedUpdateWithoutGeneratedThemesInput>
  }

  export type ThemeUpdateWithoutGeneratedThemesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutThemesNestedInput
    organization?: OrganizationUpdateOneWithoutThemesNestedInput
    sharedWith?: ThemeShareUpdateManyWithoutThemeNestedInput
  }

  export type ThemeUncheckedUpdateWithoutGeneratedThemesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sharedWith?: ThemeShareUncheckedUpdateManyWithoutThemeNestedInput
  }

  export type UserCreateWithoutNeutralPalettesInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeCreateNestedManyWithoutUserInput
    colorPalettes?: ColorPaletteCreateNestedManyWithoutUserInput
    organizationMemberships?: OrganizationMemberCreateNestedManyWithoutUserInput
    purchase?: PurchaseCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNeutralPalettesInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeUncheckedCreateNestedManyWithoutUserInput
    colorPalettes?: ColorPaletteUncheckedCreateNestedManyWithoutUserInput
    organizationMemberships?: OrganizationMemberUncheckedCreateNestedManyWithoutUserInput
    purchase?: PurchaseUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNeutralPalettesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNeutralPalettesInput, UserUncheckedCreateWithoutNeutralPalettesInput>
  }

  export type UserUpsertWithoutNeutralPalettesInput = {
    update: XOR<UserUpdateWithoutNeutralPalettesInput, UserUncheckedUpdateWithoutNeutralPalettesInput>
    create: XOR<UserCreateWithoutNeutralPalettesInput, UserUncheckedCreateWithoutNeutralPalettesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNeutralPalettesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNeutralPalettesInput, UserUncheckedUpdateWithoutNeutralPalettesInput>
  }

  export type UserUpdateWithoutNeutralPalettesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUpdateManyWithoutUserNestedInput
    colorPalettes?: ColorPaletteUpdateManyWithoutUserNestedInput
    organizationMemberships?: OrganizationMemberUpdateManyWithoutUserNestedInput
    purchase?: PurchaseUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNeutralPalettesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUncheckedUpdateManyWithoutUserNestedInput
    colorPalettes?: ColorPaletteUncheckedUpdateManyWithoutUserNestedInput
    organizationMemberships?: OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput
    purchase?: PurchaseUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutThemesInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    colorPalettes?: ColorPaletteCreateNestedManyWithoutUserInput
    neutralPalettes?: NeutralPaletteCreateNestedManyWithoutUserInput
    organizationMemberships?: OrganizationMemberCreateNestedManyWithoutUserInput
    purchase?: PurchaseCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutThemesInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    colorPalettes?: ColorPaletteUncheckedCreateNestedManyWithoutUserInput
    neutralPalettes?: NeutralPaletteUncheckedCreateNestedManyWithoutUserInput
    organizationMemberships?: OrganizationMemberUncheckedCreateNestedManyWithoutUserInput
    purchase?: PurchaseUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutThemesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutThemesInput, UserUncheckedCreateWithoutThemesInput>
  }

  export type OrganizationCreateWithoutThemesInput = {
    id?: string
    clerkOrgId: string
    name: string
    seats: number
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: OrganizationMemberCreateNestedManyWithoutOrganizationInput
    purchase?: PurchaseCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutThemesInput = {
    id?: string
    clerkOrgId: string
    name: string
    seats: number
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput
    purchase?: PurchaseUncheckedCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutThemesInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutThemesInput, OrganizationUncheckedCreateWithoutThemesInput>
  }

  export type GeneratedThemeCreateWithoutThemeInput = {
    id?: string
    generatedJson: JsonNullValueInput | InputJsonValue
    version: string
    createdAt?: Date | string
  }

  export type GeneratedThemeUncheckedCreateWithoutThemeInput = {
    id?: string
    generatedJson: JsonNullValueInput | InputJsonValue
    version: string
    createdAt?: Date | string
  }

  export type GeneratedThemeCreateOrConnectWithoutThemeInput = {
    where: GeneratedThemeWhereUniqueInput
    create: XOR<GeneratedThemeCreateWithoutThemeInput, GeneratedThemeUncheckedCreateWithoutThemeInput>
  }

  export type GeneratedThemeCreateManyThemeInputEnvelope = {
    data: GeneratedThemeCreateManyThemeInput | GeneratedThemeCreateManyThemeInput[]
    skipDuplicates?: boolean
  }

  export type ThemeShareCreateWithoutThemeInput = {
    id?: string
    sharedBy: string
    sharedWith: string
    createdAt?: Date | string
  }

  export type ThemeShareUncheckedCreateWithoutThemeInput = {
    id?: string
    sharedBy: string
    sharedWith: string
    createdAt?: Date | string
  }

  export type ThemeShareCreateOrConnectWithoutThemeInput = {
    where: ThemeShareWhereUniqueInput
    create: XOR<ThemeShareCreateWithoutThemeInput, ThemeShareUncheckedCreateWithoutThemeInput>
  }

  export type ThemeShareCreateManyThemeInputEnvelope = {
    data: ThemeShareCreateManyThemeInput | ThemeShareCreateManyThemeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutThemesInput = {
    update: XOR<UserUpdateWithoutThemesInput, UserUncheckedUpdateWithoutThemesInput>
    create: XOR<UserCreateWithoutThemesInput, UserUncheckedCreateWithoutThemesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutThemesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutThemesInput, UserUncheckedUpdateWithoutThemesInput>
  }

  export type UserUpdateWithoutThemesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colorPalettes?: ColorPaletteUpdateManyWithoutUserNestedInput
    neutralPalettes?: NeutralPaletteUpdateManyWithoutUserNestedInput
    organizationMemberships?: OrganizationMemberUpdateManyWithoutUserNestedInput
    purchase?: PurchaseUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutThemesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colorPalettes?: ColorPaletteUncheckedUpdateManyWithoutUserNestedInput
    neutralPalettes?: NeutralPaletteUncheckedUpdateManyWithoutUserNestedInput
    organizationMemberships?: OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput
    purchase?: PurchaseUncheckedUpdateOneWithoutUserNestedInput
  }

  export type OrganizationUpsertWithoutThemesInput = {
    update: XOR<OrganizationUpdateWithoutThemesInput, OrganizationUncheckedUpdateWithoutThemesInput>
    create: XOR<OrganizationCreateWithoutThemesInput, OrganizationUncheckedCreateWithoutThemesInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutThemesInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutThemesInput, OrganizationUncheckedUpdateWithoutThemesInput>
  }

  export type OrganizationUpdateWithoutThemesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkOrgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: OrganizationMemberUpdateManyWithoutOrganizationNestedInput
    purchase?: PurchaseUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutThemesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkOrgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput
    purchase?: PurchaseUncheckedUpdateOneWithoutOrganizationNestedInput
  }

  export type GeneratedThemeUpsertWithWhereUniqueWithoutThemeInput = {
    where: GeneratedThemeWhereUniqueInput
    update: XOR<GeneratedThemeUpdateWithoutThemeInput, GeneratedThemeUncheckedUpdateWithoutThemeInput>
    create: XOR<GeneratedThemeCreateWithoutThemeInput, GeneratedThemeUncheckedCreateWithoutThemeInput>
  }

  export type GeneratedThemeUpdateWithWhereUniqueWithoutThemeInput = {
    where: GeneratedThemeWhereUniqueInput
    data: XOR<GeneratedThemeUpdateWithoutThemeInput, GeneratedThemeUncheckedUpdateWithoutThemeInput>
  }

  export type GeneratedThemeUpdateManyWithWhereWithoutThemeInput = {
    where: GeneratedThemeScalarWhereInput
    data: XOR<GeneratedThemeUpdateManyMutationInput, GeneratedThemeUncheckedUpdateManyWithoutThemeInput>
  }

  export type GeneratedThemeScalarWhereInput = {
    AND?: GeneratedThemeScalarWhereInput | GeneratedThemeScalarWhereInput[]
    OR?: GeneratedThemeScalarWhereInput[]
    NOT?: GeneratedThemeScalarWhereInput | GeneratedThemeScalarWhereInput[]
    id?: StringFilter<"GeneratedTheme"> | string
    themeId?: StringFilter<"GeneratedTheme"> | string
    generatedJson?: JsonFilter<"GeneratedTheme">
    version?: StringFilter<"GeneratedTheme"> | string
    createdAt?: DateTimeFilter<"GeneratedTheme"> | Date | string
  }

  export type ThemeShareUpsertWithWhereUniqueWithoutThemeInput = {
    where: ThemeShareWhereUniqueInput
    update: XOR<ThemeShareUpdateWithoutThemeInput, ThemeShareUncheckedUpdateWithoutThemeInput>
    create: XOR<ThemeShareCreateWithoutThemeInput, ThemeShareUncheckedCreateWithoutThemeInput>
  }

  export type ThemeShareUpdateWithWhereUniqueWithoutThemeInput = {
    where: ThemeShareWhereUniqueInput
    data: XOR<ThemeShareUpdateWithoutThemeInput, ThemeShareUncheckedUpdateWithoutThemeInput>
  }

  export type ThemeShareUpdateManyWithWhereWithoutThemeInput = {
    where: ThemeShareScalarWhereInput
    data: XOR<ThemeShareUpdateManyMutationInput, ThemeShareUncheckedUpdateManyWithoutThemeInput>
  }

  export type ThemeShareScalarWhereInput = {
    AND?: ThemeShareScalarWhereInput | ThemeShareScalarWhereInput[]
    OR?: ThemeShareScalarWhereInput[]
    NOT?: ThemeShareScalarWhereInput | ThemeShareScalarWhereInput[]
    id?: StringFilter<"ThemeShare"> | string
    themeId?: StringFilter<"ThemeShare"> | string
    sharedBy?: StringFilter<"ThemeShare"> | string
    sharedWith?: StringFilter<"ThemeShare"> | string
    createdAt?: DateTimeFilter<"ThemeShare"> | Date | string
  }

  export type ThemeCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
    organization?: OrganizationCreateNestedOneWithoutThemesInput
    generatedThemes?: GeneratedThemeCreateNestedManyWithoutThemeInput
    sharedWith?: ThemeShareCreateNestedManyWithoutThemeInput
  }

  export type ThemeUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    organizationId?: string | null
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
    generatedThemes?: GeneratedThemeUncheckedCreateNestedManyWithoutThemeInput
    sharedWith?: ThemeShareUncheckedCreateNestedManyWithoutThemeInput
  }

  export type ThemeCreateOrConnectWithoutUserInput = {
    where: ThemeWhereUniqueInput
    create: XOR<ThemeCreateWithoutUserInput, ThemeUncheckedCreateWithoutUserInput>
  }

  export type ThemeCreateManyUserInputEnvelope = {
    data: ThemeCreateManyUserInput | ThemeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ColorPaletteCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColorPaletteUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColorPaletteCreateOrConnectWithoutUserInput = {
    where: ColorPaletteWhereUniqueInput
    create: XOR<ColorPaletteCreateWithoutUserInput, ColorPaletteUncheckedCreateWithoutUserInput>
  }

  export type ColorPaletteCreateManyUserInputEnvelope = {
    data: ColorPaletteCreateManyUserInput | ColorPaletteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NeutralPaletteCreateWithoutUserInput = {
    id?: string
    name: string
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NeutralPaletteUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NeutralPaletteCreateOrConnectWithoutUserInput = {
    where: NeutralPaletteWhereUniqueInput
    create: XOR<NeutralPaletteCreateWithoutUserInput, NeutralPaletteUncheckedCreateWithoutUserInput>
  }

  export type NeutralPaletteCreateManyUserInputEnvelope = {
    data: NeutralPaletteCreateManyUserInput | NeutralPaletteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationMemberCreateWithoutUserInput = {
    id?: string
    role?: $Enums.OrganizationRole
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutMembersInput
  }

  export type OrganizationMemberUncheckedCreateWithoutUserInput = {
    id?: string
    organizationId: string
    role?: $Enums.OrganizationRole
    createdAt?: Date | string
  }

  export type OrganizationMemberCreateOrConnectWithoutUserInput = {
    where: OrganizationMemberWhereUniqueInput
    create: XOR<OrganizationMemberCreateWithoutUserInput, OrganizationMemberUncheckedCreateWithoutUserInput>
  }

  export type OrganizationMemberCreateManyUserInputEnvelope = {
    data: OrganizationMemberCreateManyUserInput | OrganizationMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PurchaseCreateWithoutUserInput = {
    id?: string
    stripeCustomerId: string
    stripePaymentId: string
    stripePriceId: string
    amount: number
    currency?: string
    plan: $Enums.PurchasePlan
    seats?: number | null
    status?: $Enums.PurchaseStatus
    createdAt?: Date | string
    organization?: OrganizationCreateNestedOneWithoutPurchaseInput
  }

  export type PurchaseUncheckedCreateWithoutUserInput = {
    id?: string
    organizationId?: string | null
    stripeCustomerId: string
    stripePaymentId: string
    stripePriceId: string
    amount: number
    currency?: string
    plan: $Enums.PurchasePlan
    seats?: number | null
    status?: $Enums.PurchaseStatus
    createdAt?: Date | string
  }

  export type PurchaseCreateOrConnectWithoutUserInput = {
    where: PurchaseWhereUniqueInput
    create: XOR<PurchaseCreateWithoutUserInput, PurchaseUncheckedCreateWithoutUserInput>
  }

  export type ThemeUpsertWithWhereUniqueWithoutUserInput = {
    where: ThemeWhereUniqueInput
    update: XOR<ThemeUpdateWithoutUserInput, ThemeUncheckedUpdateWithoutUserInput>
    create: XOR<ThemeCreateWithoutUserInput, ThemeUncheckedCreateWithoutUserInput>
  }

  export type ThemeUpdateWithWhereUniqueWithoutUserInput = {
    where: ThemeWhereUniqueInput
    data: XOR<ThemeUpdateWithoutUserInput, ThemeUncheckedUpdateWithoutUserInput>
  }

  export type ThemeUpdateManyWithWhereWithoutUserInput = {
    where: ThemeScalarWhereInput
    data: XOR<ThemeUpdateManyMutationInput, ThemeUncheckedUpdateManyWithoutUserInput>
  }

  export type ThemeScalarWhereInput = {
    AND?: ThemeScalarWhereInput | ThemeScalarWhereInput[]
    OR?: ThemeScalarWhereInput[]
    NOT?: ThemeScalarWhereInput | ThemeScalarWhereInput[]
    id?: StringFilter<"Theme"> | string
    userId?: StringFilter<"Theme"> | string
    name?: StringFilter<"Theme"> | string
    description?: StringNullableFilter<"Theme"> | string | null
    themeData?: JsonFilter<"Theme">
    version?: StringFilter<"Theme"> | string
    isDefault?: BoolFilter<"Theme"> | boolean
    organizationId?: StringNullableFilter<"Theme"> | string | null
    visibility?: EnumThemeVisibilityFilter<"Theme"> | $Enums.ThemeVisibility
    createdAt?: DateTimeFilter<"Theme"> | Date | string
    updatedAt?: DateTimeFilter<"Theme"> | Date | string
  }

  export type ColorPaletteUpsertWithWhereUniqueWithoutUserInput = {
    where: ColorPaletteWhereUniqueInput
    update: XOR<ColorPaletteUpdateWithoutUserInput, ColorPaletteUncheckedUpdateWithoutUserInput>
    create: XOR<ColorPaletteCreateWithoutUserInput, ColorPaletteUncheckedCreateWithoutUserInput>
  }

  export type ColorPaletteUpdateWithWhereUniqueWithoutUserInput = {
    where: ColorPaletteWhereUniqueInput
    data: XOR<ColorPaletteUpdateWithoutUserInput, ColorPaletteUncheckedUpdateWithoutUserInput>
  }

  export type ColorPaletteUpdateManyWithWhereWithoutUserInput = {
    where: ColorPaletteScalarWhereInput
    data: XOR<ColorPaletteUpdateManyMutationInput, ColorPaletteUncheckedUpdateManyWithoutUserInput>
  }

  export type ColorPaletteScalarWhereInput = {
    AND?: ColorPaletteScalarWhereInput | ColorPaletteScalarWhereInput[]
    OR?: ColorPaletteScalarWhereInput[]
    NOT?: ColorPaletteScalarWhereInput | ColorPaletteScalarWhereInput[]
    id?: StringFilter<"ColorPalette"> | string
    userId?: StringFilter<"ColorPalette"> | string
    name?: StringFilter<"ColorPalette"> | string
    description?: StringNullableFilter<"ColorPalette"> | string | null
    colors?: JsonFilter<"ColorPalette">
    isBuiltIn?: BoolFilter<"ColorPalette"> | boolean
    createdAt?: DateTimeFilter<"ColorPalette"> | Date | string
    updatedAt?: DateTimeFilter<"ColorPalette"> | Date | string
  }

  export type NeutralPaletteUpsertWithWhereUniqueWithoutUserInput = {
    where: NeutralPaletteWhereUniqueInput
    update: XOR<NeutralPaletteUpdateWithoutUserInput, NeutralPaletteUncheckedUpdateWithoutUserInput>
    create: XOR<NeutralPaletteCreateWithoutUserInput, NeutralPaletteUncheckedCreateWithoutUserInput>
  }

  export type NeutralPaletteUpdateWithWhereUniqueWithoutUserInput = {
    where: NeutralPaletteWhereUniqueInput
    data: XOR<NeutralPaletteUpdateWithoutUserInput, NeutralPaletteUncheckedUpdateWithoutUserInput>
  }

  export type NeutralPaletteUpdateManyWithWhereWithoutUserInput = {
    where: NeutralPaletteScalarWhereInput
    data: XOR<NeutralPaletteUpdateManyMutationInput, NeutralPaletteUncheckedUpdateManyWithoutUserInput>
  }

  export type NeutralPaletteScalarWhereInput = {
    AND?: NeutralPaletteScalarWhereInput | NeutralPaletteScalarWhereInput[]
    OR?: NeutralPaletteScalarWhereInput[]
    NOT?: NeutralPaletteScalarWhereInput | NeutralPaletteScalarWhereInput[]
    id?: StringFilter<"NeutralPalette"> | string
    userId?: StringNullableFilter<"NeutralPalette"> | string | null
    name?: StringFilter<"NeutralPalette"> | string
    colors?: JsonFilter<"NeutralPalette">
    isBuiltIn?: BoolFilter<"NeutralPalette"> | boolean
    createdAt?: DateTimeFilter<"NeutralPalette"> | Date | string
    updatedAt?: DateTimeFilter<"NeutralPalette"> | Date | string
  }

  export type OrganizationMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: OrganizationMemberWhereUniqueInput
    update: XOR<OrganizationMemberUpdateWithoutUserInput, OrganizationMemberUncheckedUpdateWithoutUserInput>
    create: XOR<OrganizationMemberCreateWithoutUserInput, OrganizationMemberUncheckedCreateWithoutUserInput>
  }

  export type OrganizationMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: OrganizationMemberWhereUniqueInput
    data: XOR<OrganizationMemberUpdateWithoutUserInput, OrganizationMemberUncheckedUpdateWithoutUserInput>
  }

  export type OrganizationMemberUpdateManyWithWhereWithoutUserInput = {
    where: OrganizationMemberScalarWhereInput
    data: XOR<OrganizationMemberUpdateManyMutationInput, OrganizationMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type OrganizationMemberScalarWhereInput = {
    AND?: OrganizationMemberScalarWhereInput | OrganizationMemberScalarWhereInput[]
    OR?: OrganizationMemberScalarWhereInput[]
    NOT?: OrganizationMemberScalarWhereInput | OrganizationMemberScalarWhereInput[]
    id?: StringFilter<"OrganizationMember"> | string
    organizationId?: StringFilter<"OrganizationMember"> | string
    userId?: StringFilter<"OrganizationMember"> | string
    role?: EnumOrganizationRoleFilter<"OrganizationMember"> | $Enums.OrganizationRole
    createdAt?: DateTimeFilter<"OrganizationMember"> | Date | string
  }

  export type PurchaseUpsertWithoutUserInput = {
    update: XOR<PurchaseUpdateWithoutUserInput, PurchaseUncheckedUpdateWithoutUserInput>
    create: XOR<PurchaseCreateWithoutUserInput, PurchaseUncheckedCreateWithoutUserInput>
    where?: PurchaseWhereInput
  }

  export type PurchaseUpdateToOneWithWhereWithoutUserInput = {
    where?: PurchaseWhereInput
    data: XOR<PurchaseUpdateWithoutUserInput, PurchaseUncheckedUpdateWithoutUserInput>
  }

  export type PurchaseUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    stripePriceId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    plan?: EnumPurchasePlanFieldUpdateOperationsInput | $Enums.PurchasePlan
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | $Enums.PurchaseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutPurchaseNestedInput
  }

  export type PurchaseUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    stripePriceId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    plan?: EnumPurchasePlanFieldUpdateOperationsInput | $Enums.PurchasePlan
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | $Enums.PurchaseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationMemberCreateWithoutOrganizationInput = {
    id?: string
    role?: $Enums.OrganizationRole
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutOrganizationMembershipsInput
  }

  export type OrganizationMemberUncheckedCreateWithoutOrganizationInput = {
    id?: string
    userId: string
    role?: $Enums.OrganizationRole
    createdAt?: Date | string
  }

  export type OrganizationMemberCreateOrConnectWithoutOrganizationInput = {
    where: OrganizationMemberWhereUniqueInput
    create: XOR<OrganizationMemberCreateWithoutOrganizationInput, OrganizationMemberUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationMemberCreateManyOrganizationInputEnvelope = {
    data: OrganizationMemberCreateManyOrganizationInput | OrganizationMemberCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type ThemeCreateWithoutOrganizationInput = {
    id?: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutThemesInput
    generatedThemes?: GeneratedThemeCreateNestedManyWithoutThemeInput
    sharedWith?: ThemeShareCreateNestedManyWithoutThemeInput
  }

  export type ThemeUncheckedCreateWithoutOrganizationInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
    generatedThemes?: GeneratedThemeUncheckedCreateNestedManyWithoutThemeInput
    sharedWith?: ThemeShareUncheckedCreateNestedManyWithoutThemeInput
  }

  export type ThemeCreateOrConnectWithoutOrganizationInput = {
    where: ThemeWhereUniqueInput
    create: XOR<ThemeCreateWithoutOrganizationInput, ThemeUncheckedCreateWithoutOrganizationInput>
  }

  export type ThemeCreateManyOrganizationInputEnvelope = {
    data: ThemeCreateManyOrganizationInput | ThemeCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type PurchaseCreateWithoutOrganizationInput = {
    id?: string
    stripeCustomerId: string
    stripePaymentId: string
    stripePriceId: string
    amount: number
    currency?: string
    plan: $Enums.PurchasePlan
    seats?: number | null
    status?: $Enums.PurchaseStatus
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutPurchaseInput
  }

  export type PurchaseUncheckedCreateWithoutOrganizationInput = {
    id?: string
    userId?: string | null
    stripeCustomerId: string
    stripePaymentId: string
    stripePriceId: string
    amount: number
    currency?: string
    plan: $Enums.PurchasePlan
    seats?: number | null
    status?: $Enums.PurchaseStatus
    createdAt?: Date | string
  }

  export type PurchaseCreateOrConnectWithoutOrganizationInput = {
    where: PurchaseWhereUniqueInput
    create: XOR<PurchaseCreateWithoutOrganizationInput, PurchaseUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationMemberWhereUniqueInput
    update: XOR<OrganizationMemberUpdateWithoutOrganizationInput, OrganizationMemberUncheckedUpdateWithoutOrganizationInput>
    create: XOR<OrganizationMemberCreateWithoutOrganizationInput, OrganizationMemberUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationMemberWhereUniqueInput
    data: XOR<OrganizationMemberUpdateWithoutOrganizationInput, OrganizationMemberUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput = {
    where: OrganizationMemberScalarWhereInput
    data: XOR<OrganizationMemberUpdateManyMutationInput, OrganizationMemberUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type ThemeUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: ThemeWhereUniqueInput
    update: XOR<ThemeUpdateWithoutOrganizationInput, ThemeUncheckedUpdateWithoutOrganizationInput>
    create: XOR<ThemeCreateWithoutOrganizationInput, ThemeUncheckedCreateWithoutOrganizationInput>
  }

  export type ThemeUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: ThemeWhereUniqueInput
    data: XOR<ThemeUpdateWithoutOrganizationInput, ThemeUncheckedUpdateWithoutOrganizationInput>
  }

  export type ThemeUpdateManyWithWhereWithoutOrganizationInput = {
    where: ThemeScalarWhereInput
    data: XOR<ThemeUpdateManyMutationInput, ThemeUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type PurchaseUpsertWithoutOrganizationInput = {
    update: XOR<PurchaseUpdateWithoutOrganizationInput, PurchaseUncheckedUpdateWithoutOrganizationInput>
    create: XOR<PurchaseCreateWithoutOrganizationInput, PurchaseUncheckedCreateWithoutOrganizationInput>
    where?: PurchaseWhereInput
  }

  export type PurchaseUpdateToOneWithWhereWithoutOrganizationInput = {
    where?: PurchaseWhereInput
    data: XOR<PurchaseUpdateWithoutOrganizationInput, PurchaseUncheckedUpdateWithoutOrganizationInput>
  }

  export type PurchaseUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    stripePriceId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    plan?: EnumPurchasePlanFieldUpdateOperationsInput | $Enums.PurchasePlan
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | $Enums.PurchaseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPurchaseNestedInput
  }

  export type PurchaseUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    stripePriceId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    plan?: EnumPurchasePlanFieldUpdateOperationsInput | $Enums.PurchasePlan
    seats?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumPurchaseStatusFieldUpdateOperationsInput | $Enums.PurchaseStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationCreateWithoutMembersInput = {
    id?: string
    clerkOrgId: string
    name: string
    seats: number
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeCreateNestedManyWithoutOrganizationInput
    purchase?: PurchaseCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutMembersInput = {
    id?: string
    clerkOrgId: string
    name: string
    seats: number
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeUncheckedCreateNestedManyWithoutOrganizationInput
    purchase?: PurchaseUncheckedCreateNestedOneWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutMembersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutOrganizationMembershipsInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeCreateNestedManyWithoutUserInput
    colorPalettes?: ColorPaletteCreateNestedManyWithoutUserInput
    neutralPalettes?: NeutralPaletteCreateNestedManyWithoutUserInput
    purchase?: PurchaseCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizationMembershipsInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeUncheckedCreateNestedManyWithoutUserInput
    colorPalettes?: ColorPaletteUncheckedCreateNestedManyWithoutUserInput
    neutralPalettes?: NeutralPaletteUncheckedCreateNestedManyWithoutUserInput
    purchase?: PurchaseUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizationMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizationMembershipsInput, UserUncheckedCreateWithoutOrganizationMembershipsInput>
  }

  export type OrganizationUpsertWithoutMembersInput = {
    update: XOR<OrganizationUpdateWithoutMembersInput, OrganizationUncheckedUpdateWithoutMembersInput>
    create: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutMembersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutMembersInput, OrganizationUncheckedUpdateWithoutMembersInput>
  }

  export type OrganizationUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkOrgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUpdateManyWithoutOrganizationNestedInput
    purchase?: PurchaseUpdateOneWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkOrgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUncheckedUpdateManyWithoutOrganizationNestedInput
    purchase?: PurchaseUncheckedUpdateOneWithoutOrganizationNestedInput
  }

  export type UserUpsertWithoutOrganizationMembershipsInput = {
    update: XOR<UserUpdateWithoutOrganizationMembershipsInput, UserUncheckedUpdateWithoutOrganizationMembershipsInput>
    create: XOR<UserCreateWithoutOrganizationMembershipsInput, UserUncheckedCreateWithoutOrganizationMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrganizationMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrganizationMembershipsInput, UserUncheckedUpdateWithoutOrganizationMembershipsInput>
  }

  export type UserUpdateWithoutOrganizationMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUpdateManyWithoutUserNestedInput
    colorPalettes?: ColorPaletteUpdateManyWithoutUserNestedInput
    neutralPalettes?: NeutralPaletteUpdateManyWithoutUserNestedInput
    purchase?: PurchaseUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUncheckedUpdateManyWithoutUserNestedInput
    colorPalettes?: ColorPaletteUncheckedUpdateManyWithoutUserNestedInput
    neutralPalettes?: NeutralPaletteUncheckedUpdateManyWithoutUserNestedInput
    purchase?: PurchaseUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutPurchaseInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeCreateNestedManyWithoutUserInput
    colorPalettes?: ColorPaletteCreateNestedManyWithoutUserInput
    neutralPalettes?: NeutralPaletteCreateNestedManyWithoutUserInput
    organizationMemberships?: OrganizationMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPurchaseInput = {
    id: string
    email: string
    plan?: $Enums.UserPlan
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    themes?: ThemeUncheckedCreateNestedManyWithoutUserInput
    colorPalettes?: ColorPaletteUncheckedCreateNestedManyWithoutUserInput
    neutralPalettes?: NeutralPaletteUncheckedCreateNestedManyWithoutUserInput
    organizationMemberships?: OrganizationMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPurchaseInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPurchaseInput, UserUncheckedCreateWithoutPurchaseInput>
  }

  export type OrganizationCreateWithoutPurchaseInput = {
    id?: string
    clerkOrgId: string
    name: string
    seats: number
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: OrganizationMemberCreateNestedManyWithoutOrganizationInput
    themes?: ThemeCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutPurchaseInput = {
    id?: string
    clerkOrgId: string
    name: string
    seats: number
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput
    themes?: ThemeUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutPurchaseInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutPurchaseInput, OrganizationUncheckedCreateWithoutPurchaseInput>
  }

  export type UserUpsertWithoutPurchaseInput = {
    update: XOR<UserUpdateWithoutPurchaseInput, UserUncheckedUpdateWithoutPurchaseInput>
    create: XOR<UserCreateWithoutPurchaseInput, UserUncheckedCreateWithoutPurchaseInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPurchaseInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPurchaseInput, UserUncheckedUpdateWithoutPurchaseInput>
  }

  export type UserUpdateWithoutPurchaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUpdateManyWithoutUserNestedInput
    colorPalettes?: ColorPaletteUpdateManyWithoutUserNestedInput
    neutralPalettes?: NeutralPaletteUpdateManyWithoutUserNestedInput
    organizationMemberships?: OrganizationMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPurchaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumUserPlanFieldUpdateOperationsInput | $Enums.UserPlan
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUncheckedUpdateManyWithoutUserNestedInput
    colorPalettes?: ColorPaletteUncheckedUpdateManyWithoutUserNestedInput
    neutralPalettes?: NeutralPaletteUncheckedUpdateManyWithoutUserNestedInput
    organizationMemberships?: OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationUpsertWithoutPurchaseInput = {
    update: XOR<OrganizationUpdateWithoutPurchaseInput, OrganizationUncheckedUpdateWithoutPurchaseInput>
    create: XOR<OrganizationCreateWithoutPurchaseInput, OrganizationUncheckedCreateWithoutPurchaseInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutPurchaseInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutPurchaseInput, OrganizationUncheckedUpdateWithoutPurchaseInput>
  }

  export type OrganizationUpdateWithoutPurchaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkOrgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: OrganizationMemberUpdateManyWithoutOrganizationNestedInput
    themes?: ThemeUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutPurchaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkOrgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput
    themes?: ThemeUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type ThemeCreateWithoutSharedWithInput = {
    id?: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutThemesInput
    organization?: OrganizationCreateNestedOneWithoutThemesInput
    generatedThemes?: GeneratedThemeCreateNestedManyWithoutThemeInput
  }

  export type ThemeUncheckedCreateWithoutSharedWithInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    organizationId?: string | null
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
    generatedThemes?: GeneratedThemeUncheckedCreateNestedManyWithoutThemeInput
  }

  export type ThemeCreateOrConnectWithoutSharedWithInput = {
    where: ThemeWhereUniqueInput
    create: XOR<ThemeCreateWithoutSharedWithInput, ThemeUncheckedCreateWithoutSharedWithInput>
  }

  export type ThemeUpsertWithoutSharedWithInput = {
    update: XOR<ThemeUpdateWithoutSharedWithInput, ThemeUncheckedUpdateWithoutSharedWithInput>
    create: XOR<ThemeCreateWithoutSharedWithInput, ThemeUncheckedCreateWithoutSharedWithInput>
    where?: ThemeWhereInput
  }

  export type ThemeUpdateToOneWithWhereWithoutSharedWithInput = {
    where?: ThemeWhereInput
    data: XOR<ThemeUpdateWithoutSharedWithInput, ThemeUncheckedUpdateWithoutSharedWithInput>
  }

  export type ThemeUpdateWithoutSharedWithInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutThemesNestedInput
    organization?: OrganizationUpdateOneWithoutThemesNestedInput
    generatedThemes?: GeneratedThemeUpdateManyWithoutThemeNestedInput
  }

  export type ThemeUncheckedUpdateWithoutSharedWithInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedThemes?: GeneratedThemeUncheckedUpdateManyWithoutThemeNestedInput
  }

  export type GeneratedThemeCreateManyThemeInput = {
    id?: string
    generatedJson: JsonNullValueInput | InputJsonValue
    version: string
    createdAt?: Date | string
  }

  export type ThemeShareCreateManyThemeInput = {
    id?: string
    sharedBy: string
    sharedWith: string
    createdAt?: Date | string
  }

  export type GeneratedThemeUpdateWithoutThemeInput = {
    id?: StringFieldUpdateOperationsInput | string
    generatedJson?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedThemeUncheckedUpdateWithoutThemeInput = {
    id?: StringFieldUpdateOperationsInput | string
    generatedJson?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneratedThemeUncheckedUpdateManyWithoutThemeInput = {
    id?: StringFieldUpdateOperationsInput | string
    generatedJson?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeShareUpdateWithoutThemeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedBy?: StringFieldUpdateOperationsInput | string
    sharedWith?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeShareUncheckedUpdateWithoutThemeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedBy?: StringFieldUpdateOperationsInput | string
    sharedWith?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeShareUncheckedUpdateManyWithoutThemeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedBy?: StringFieldUpdateOperationsInput | string
    sharedWith?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    organizationId?: string | null
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColorPaletteCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NeutralPaletteCreateManyUserInput = {
    id?: string
    name: string
    colors: JsonNullValueInput | InputJsonValue
    isBuiltIn?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationMemberCreateManyUserInput = {
    id?: string
    organizationId: string
    role?: $Enums.OrganizationRole
    createdAt?: Date | string
  }

  export type ThemeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutThemesNestedInput
    generatedThemes?: GeneratedThemeUpdateManyWithoutThemeNestedInput
    sharedWith?: ThemeShareUpdateManyWithoutThemeNestedInput
  }

  export type ThemeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedThemes?: GeneratedThemeUncheckedUpdateManyWithoutThemeNestedInput
    sharedWith?: ThemeShareUncheckedUpdateManyWithoutThemeNestedInput
  }

  export type ThemeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColorPaletteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColorPaletteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColorPaletteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NeutralPaletteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NeutralPaletteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NeutralPaletteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    colors?: JsonNullValueInput | InputJsonValue
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumOrganizationRoleFieldUpdateOperationsInput | $Enums.OrganizationRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutMembersNestedInput
  }

  export type OrganizationMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    role?: EnumOrganizationRoleFieldUpdateOperationsInput | $Enums.OrganizationRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    role?: EnumOrganizationRoleFieldUpdateOperationsInput | $Enums.OrganizationRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationMemberCreateManyOrganizationInput = {
    id?: string
    userId: string
    role?: $Enums.OrganizationRole
    createdAt?: Date | string
  }

  export type ThemeCreateManyOrganizationInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    themeData: JsonNullValueInput | InputJsonValue
    version?: string
    isDefault?: boolean
    visibility?: $Enums.ThemeVisibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationMemberUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumOrganizationRoleFieldUpdateOperationsInput | $Enums.OrganizationRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrganizationMembershipsNestedInput
  }

  export type OrganizationMemberUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumOrganizationRoleFieldUpdateOperationsInput | $Enums.OrganizationRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationMemberUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumOrganizationRoleFieldUpdateOperationsInput | $Enums.OrganizationRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutThemesNestedInput
    generatedThemes?: GeneratedThemeUpdateManyWithoutThemeNestedInput
    sharedWith?: ThemeShareUpdateManyWithoutThemeNestedInput
  }

  export type ThemeUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedThemes?: GeneratedThemeUncheckedUpdateManyWithoutThemeNestedInput
    sharedWith?: ThemeShareUncheckedUpdateManyWithoutThemeNestedInput
  }

  export type ThemeUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    themeData?: JsonNullValueInput | InputJsonValue
    version?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    visibility?: EnumThemeVisibilityFieldUpdateOperationsInput | $Enums.ThemeVisibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}