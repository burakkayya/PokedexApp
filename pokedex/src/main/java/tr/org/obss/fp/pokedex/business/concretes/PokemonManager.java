package tr.org.obss.fp.pokedex.business.concretes;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import tr.org.obss.fp.pokedex.business.abstracts.PokemonService;
import tr.org.obss.fp.pokedex.business.dto.requests.CreatePokemonRequestDTO;
import tr.org.obss.fp.pokedex.business.dto.responses.PokemonResponseDTO;
import tr.org.obss.fp.pokedex.business.dto.requests.UpdatePokemonRequestDTO;
import tr.org.obss.fp.pokedex.business.rules.PokemonBusinessRules;
import tr.org.obss.fp.pokedex.entities.Pokemon;
import tr.org.obss.fp.pokedex.repository.PokemonRepository;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class PokemonManager implements PokemonService {
    private final PokemonRepository pokemonRepository;
    private  final ModelMapper mapper;
    private final PokemonBusinessRules rules;

    @Override
    public List<PokemonResponseDTO> getAll() {
        List<Pokemon> pokemons = pokemonRepository.findAll();
        List<PokemonResponseDTO> responses = pokemons
                .stream()
                .map(pokemon -> mapper.map(pokemon, PokemonResponseDTO.class))
                .toList();
        return responses;
    }

    @Override
    public PokemonResponseDTO getById(long id) {
        rules.checkIfPokemonExistsById(id);
        Pokemon pokemon = pokemonRepository.findById(id).orElseThrow();
        PokemonResponseDTO response = mapper.map(pokemon, PokemonResponseDTO.class);
        return response;
    }

    @Override
    public PokemonResponseDTO getByName(String name) {
        rules.checkIfPokemonExistByName(name);
        Pokemon pokemon = pokemonRepository.findByName(name);
        PokemonResponseDTO response = mapper.map(pokemon, PokemonResponseDTO.class);
        return response;
    }

    @Override
    public Page<PokemonResponseDTO> getPokemonsWithPagination(int pageNumber, int pageSize) {
        var pageable = PageRequest.of(pageNumber, pageSize);
        var page = pokemonRepository.findAll(pageable);
        var result = page.map(user -> mapper.map(user, PokemonResponseDTO.class)).toList();

        return new PageImpl<>(result, pageable, page.getTotalElements());
    }

    @Override
    public PokemonResponseDTO add(CreatePokemonRequestDTO request) {
        rules.checkIfPokemonExistByName(request.getName());
        Pokemon pokemon= mapper.map(request,Pokemon.class);
        pokemon.setId(0);
        Pokemon createdPokemon = pokemonRepository.save(pokemon);
        PokemonResponseDTO response = mapper.map(createdPokemon,PokemonResponseDTO.class);
        return response;
    }

    @Override
    public PokemonResponseDTO update(long id, UpdatePokemonRequestDTO request) {
        rules.checkIfPokemonExistsById(id);

        Pokemon pokemonToUpdate = pokemonRepository.findById(id).orElseThrow();
        pokemonToUpdate.setId(id);
        pokemonToUpdate.setName(request.getName());
        pokemonToUpdate.setHp(request.getHp());
        pokemonToUpdate.setAttack(request.getAttack());
        pokemonToUpdate.setDefense(request.getDefense());
        pokemonToUpdate.setSpeed(request.getSpeed());
        pokemonToUpdate.setDescription(request.getDescription());

        Pokemon updatedPokemon = pokemonRepository.save(pokemonToUpdate);
        PokemonResponseDTO response = mapper.map(updatedPokemon,PokemonResponseDTO.class);
        return response;
    }

    @Override
    public PokemonResponseDTO delete(long id) {
        rules.checkIfPokemonExistsById(id);
        Pokemon pokemon = pokemonRepository.findById(id).orElseThrow();
        pokemon.setActive(false);
        var savedPokemon = pokemonRepository.save(pokemon);
        PokemonResponseDTO response = mapper.map(savedPokemon,PokemonResponseDTO.class);
        return response;
    }
}
