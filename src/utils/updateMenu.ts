export interface Category {
  name: string;
}

export interface Material {
  name: string;
}

export interface Brand {
  name: string;
}

export interface Closure {
  name: string;
}

export interface SubMenuItem {
  name: string;
}

export interface MenuItem {
  name: string;
  subMenu?: SubMenuItem[];
}

const updateMaterialSubMenu = (
  menus: MenuItem[],
  materialsData: Material[]
): MenuItem[] => {
  return menus.map((menu) => {
    if (menu.name === "Material" && materialsData) {
      const newMaterialSubMenu = materialsData.map((material) => ({
        name: material.name,
      }));
      return { ...menu, subMenu: newMaterialSubMenu };
    }
    return menu;
  });
};

const updateCategorySubMenu = (
  menus: MenuItem[],
  categoriesData: Category[]
): MenuItem[] => {
  return menus.map((menu) => {
    if (menu.name === "Category" && categoriesData) {
      const newCategorySubMenu = categoriesData.map((category) => ({
        name: category.name,
      }));
      return { ...menu, subMenu: newCategorySubMenu };
    }
    return menu;
  });
};

const updateBrandSubMenu = (
  menus: MenuItem[],
  brandsData: Brand[]
): MenuItem[] => {
  return menus.map((menu) => {
    if (menu.name === "Brand" && brandsData) {
      const newBrandSubMenu = brandsData.map((brand) => ({
        name: brand.name,
      }));
      return { ...menu, subMenu: newBrandSubMenu };
    }
    return menu;
  });
};

const updateClosureSubMenu = (
  menus: MenuItem[],
  closuresData: Closure[]
): MenuItem[] => {
  return menus.map((menu) => {
    if (menu.name === "Closure" && closuresData) {
      const newClosureSubMenu = closuresData.map((closure) => ({
        name: closure.name,
      }));
      return { ...menu, subMenu: newClosureSubMenu };
    }
    return menu;
  });
};

export const updateMenus = (
  menus: MenuItem[],
  materialsData: { data: Material[] },
  categoriesData?: { data: Category[] },
  brandsData?: { response: Brand[] },
  closuresData?: { data: Closure[] }
): MenuItem[] => {
  let updatedMenus = menus;

  if (materialsData) {
    updatedMenus = updateMaterialSubMenu(updatedMenus, materialsData.data);
  }
  if (categoriesData) {
    updatedMenus = updateCategorySubMenu(updatedMenus, categoriesData.data);
  }
  if (brandsData) {
    updatedMenus = updateBrandSubMenu(updatedMenus, brandsData.response);
  }
  if (closuresData) {
    updatedMenus = updateClosureSubMenu(updatedMenus, closuresData.data);
  }

  return updatedMenus;
};
