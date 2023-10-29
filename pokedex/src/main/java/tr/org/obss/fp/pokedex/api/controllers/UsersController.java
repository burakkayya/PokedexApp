package tr.org.obss.fp.pokedex.api.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.org.obss.fp.pokedex.business.abstracts.UserService;
import tr.org.obss.fp.pokedex.business.dto.requests.CreateUserRequestDTO;
import tr.org.obss.fp.pokedex.business.dto.requests.UpdateUserRequestDTO;
import tr.org.obss.fp.pokedex.business.dto.responses.UserResponseDTO;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UsersController {
    private final UserService service;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping
    public List<UserResponseDTO> getAll(){
        return service.getAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public UserResponseDTO getById(@PathVariable long id){
        return service.getById(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/username/{username}")
    public UserResponseDTO getByUsername(@PathVariable String username){
        return service.getByUsername(username);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/with-pagination")
    public ResponseEntity<Page<UserResponseDTO>> getUsersWithPagination(@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "2") int pageSize) {
        var userResponseDTOs = service.getUsersWithPagination(pageNumber, pageSize);
        return ResponseEntity.ok(userResponseDTOs);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponseDTO add(@Valid @RequestBody CreateUserRequestDTO request){
        return service.add(request);
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("/{id}")
    public UserResponseDTO update(@PathVariable long id, @Valid @RequestBody UpdateUserRequestDTO request){
        return service.update(id,request);
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/{id}")
    public UserResponseDTO delete(@PathVariable long id){
        return service.delete(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PutMapping("/activate/{id}")
    public UserResponseDTO activate(@PathVariable long id){
        return service.activate(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @PostMapping("/{userId}/catch/{pokemonId}")
    public UserResponseDTO addPokemonToCatchList(@PathVariable long userId, @PathVariable long pokemonId){
        return service.addPokemonToCatchList(userId, pokemonId);
    }
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @PostMapping("/{userId}/wish/{pokemonId}")
    public UserResponseDTO addPokemonToWishList(@PathVariable long userId, @PathVariable long pokemonId){
        return service.addPokemonToWishList(userId, pokemonId);
    }
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("/{userId}/catch/{pokemonId}")
    public UserResponseDTO removePokemonFromCatchList(@PathVariable long userId, @PathVariable long pokemonId){
        return service.removePokemonFromCatchList(userId, pokemonId);
    }
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("/{userId}/wish/{pokemonId}")
    public UserResponseDTO removePokemonFromWishList(@PathVariable long userId, @PathVariable long pokemonId){
        return service.removePokemonFromWishList(userId, pokemonId);
    }
}
