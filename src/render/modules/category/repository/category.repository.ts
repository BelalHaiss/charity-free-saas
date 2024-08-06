import { Category } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";
import { NewCategory } from "@shared/types/category/category.dto";

class CategoryRepository {
  findAll(branchId: number): Promise<Category[]> {
    return fetcher<Category[]>({ url: `category/${branchId}` });
  }

  createCategory(data: NewCategory) {
    return fetcher({
      url: "category",
      config: {
        method: "post",
        data,
      },
    });
  }
}

export const categoryRepository = new CategoryRepository();
