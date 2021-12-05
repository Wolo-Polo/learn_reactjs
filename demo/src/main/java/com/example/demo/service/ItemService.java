package com.example.demo.service;

import com.example.demo.entity.Item;
import com.example.demo.exception.ApiException;
import com.example.demo.repository.ItemRepository;
import com.example.demo.request.ItemRequest;
import com.example.demo.response.ItemResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ItemService
{
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ModelMapper mapper;

    public Page<ItemResponse> searchItems(Pageable pageable, String searchKey){
        Page<Item> page= itemRepository.searchItems(pageable, searchKey);
        return page.map(i -> mapper.map(i, ItemResponse.class));
    }

    public ItemResponse getById(Long id) throws ApiException {
        Item item = itemRepository.findById(id).orElseThrow(() -> ApiException.RESOURCE_NOT_FOUND);
        return mapper.map(item, ItemResponse.class);
    }

    public void create(ItemRequest itemRequest) {
        Item item = mapper.map(itemRequest, Item.class);
        item.setCreatedBy("BO");
        item.setCreatedAt(LocalDateTime.now());
        item.setModifiedBy("BO");
        item.setModifiedAt(LocalDateTime.now());
        item.setIsDeleted(false);

        itemRepository.save(item);
    }

    public ItemResponse update(Long id, ItemRequest itemRequest) throws ApiException {
        Item item = itemRepository.findById(id).orElseThrow(() -> ApiException.RESOURCE_NOT_FOUND);
        mapper.map(itemRequest, item);
        item.setModifiedBy("BO");
        item.setModifiedAt(LocalDateTime.now());
        item = itemRepository.save(item);
        return mapper.map(item, ItemResponse.class);
    }

    public void deleteById(Long id) throws Throwable {
        Optional<Item> opt = itemRepository.findById(id);
        Item item = opt.orElseThrow(() -> ApiException.RESOURCE_NOT_FOUND);
        item.setIsDeleted(true);
        itemRepository.save(item);
    }
}
