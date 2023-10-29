package tr.org.obss.fp.pokedex.api.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.org.obss.fp.pokedex.business.abstracts.PokemonService;
import tr.org.obss.fp.pokedex.business.dto.requests.CreatePokemonRequestDTO;
import tr.org.obss.fp.pokedex.business.dto.responses.PokemonResponseDTO;
import tr.org.obss.fp.pokedex.business.dto.requests.UpdatePokemonRequestDTO;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/pokemons")
public class PokemonsController {
    private final PokemonService service;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public List<PokemonResponseDTO> getAll(){
        return service.getAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public PokemonResponseDTO getById(@PathVariable long id){
        return service.getById(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/name/{name}")
    public PokemonResponseDTO getByName(@PathVariable String name){
        return service.getByName(name);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/with-pagination")
    public ResponseEntity<Page<PokemonResponseDTO>> getUsersWithPagination(@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "2") int pageSize) {
        var userResponseDTOs = service.getPokemonsWithPagination(pageNumber, pageSize);
        return ResponseEntity.ok(userResponseDTOs);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PokemonResponseDTO add(@Valid @RequestBody CreatePokemonRequestDTO request){
        return service.add(request);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public PokemonResponseDTO update(@PathVariable long id, @Valid @RequestBody UpdatePokemonRequestDTO request){
        return service.update(id,request);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public PokemonResponseDTO delete(@PathVariable long id){
        return service.delete(id);
    }
}
