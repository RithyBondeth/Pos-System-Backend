import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

export interface PaginatedDto<TData> {
    data: TData[];
    total: number;
    page: number;
    limit: number;
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
    model: TModel,
  ) => {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          title: `PaginatedResponseOf${model.name}`,
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(model) },
            },
            total: {
              type: 'number',
              example: 100,
            },
            page: {
              type: 'number',
              example: 1,
            },
            limit: {
              type: 'number',
              example: 10,
            },
          },
        },
      }),
    );
  };