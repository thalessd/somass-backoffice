export class ManageList {
  static addFirst(list: any[], item: any) {
    const copyList = [...list];

    copyList.unshift(item);

    return copyList;
  }

  static remove(list: any[], item: any) {
    const copyList = [...list];

    const itemIdx = copyList.findIndex((data) => data.id === item.id);

    copyList.splice(itemIdx, 1);

    return copyList;
  }

  static update(list: any[], item: any) {
    const copyList = [...list];

    const itemIdx = list.findIndex((data) => data.id === item.id);

    copyList[itemIdx] = item;

    return copyList;
  }
}
