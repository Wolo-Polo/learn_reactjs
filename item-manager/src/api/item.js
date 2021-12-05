import { ITEMS } from "../const/uri";
import { getAxiosClient } from "./axios-client";

const ItemsApi = {
    getItemById(id){
        return getAxiosClient().get(ITEMS + `/${id}`);
    },
    getItems(params){
        return getAxiosClient().get(ITEMS, {params});
    },
    createItem(newItem){
        return getAxiosClient().post(ITEMS, newItem);
    },
    deleteItem(ItemId){
        return getAxiosClient().delete(ITEMS + `/${ItemId}`);
    },
    updateItem(ItemId, newItem){
        return getAxiosClient().put(ITEMS + `/${ItemId}`, newItem)
    }
}

export default ItemsApi;