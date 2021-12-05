package com.example.demo.controller;

import com.example.demo.exception.ApiException;
import com.example.demo.request.ItemRequest;
import com.example.demo.service.ItemService;
import com.example.demo.validate.OnCreate;
import com.example.demo.validate.OnUpdate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/v1")
public class ItemController
{
    private final String RESOURCE_URI = "/items";
    private final String MEMBER_RESOURCE_URI = RESOURCE_URI + "/{id}";

    @Autowired
    private ItemService itemService;

    @Autowired
    private ModelMapper mapper;

    @GetMapping(RESOURCE_URI)
    public ResponseEntity searchItems(
        @RequestParam(required=false, name="page", defaultValue = "1") Integer page,
        @RequestParam(required=false, name="size", defaultValue = "10") Integer size,
        @RequestParam(required=false, name="orderBy", defaultValue = "createdAt") String orderBy,
        @RequestParam(required=false, name="orderType", defaultValue = "DESC") String orderType,
        @RequestParam(required=false, name="search", defaultValue = "") String searchKey){

        Sort.Direction sortType = Sort.Direction.ASC;
        if(orderType.equalsIgnoreCase("desc")){
            sortType = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortType, orderBy);

        Pageable pageRequest = PageRequest.of(page - 1 , size, sort);

        return ResponseEntity.ok(itemService.searchItems(pageRequest, searchKey));
    }

    @GetMapping(MEMBER_RESOURCE_URI)
    public ResponseEntity getById(@PathVariable("id") Long id) throws ApiException {
        return ResponseEntity.ok(itemService.getById(id));
    }

    @PostMapping(RESOURCE_URI)
    public ResponseEntity create(@Validated(OnCreate.class) @RequestBody ItemRequest itemRequest) {
        itemService.create(itemRequest);

        return ResponseEntity.created(URI.create(RESOURCE_URI)).build();
    }

    @PutMapping(MEMBER_RESOURCE_URI)
    public ResponseEntity update(@PathVariable("id") Long id, @Validated(OnUpdate.class)  @RequestBody ItemRequest itemRequest) throws
        ApiException {
        return ResponseEntity.ok(itemService.update(id, itemRequest));
    }

    @DeleteMapping(MEMBER_RESOURCE_URI)
    public ResponseEntity delete(@PathVariable("id") Long id) throws Throwable {
        itemService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
