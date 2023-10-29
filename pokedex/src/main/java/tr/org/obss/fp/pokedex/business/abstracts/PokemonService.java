package tr.org.obss.fp.pokedex.business.abstracts;

import org.springframework.data.domain.Page;
import tr.org.obss.fp.pokedex.business.dto.requests.CreatePokemonRequestDTO;
import tr.org.obss.fp.pokedex.business.dto.requests.UpdatePokemonRequestDTO;
import tr.org.obss.fp.pokedex.business.dto.responses.PokemonResponseDTO;

import java.util.List;

public interface PokemonService {
    List<PokemonResponseDTO> getAll();
    PokemonResponseDTO getById(long id);
    PokemonResponseDTO getByName(String name);
    Page<PokemonResponseDTO> getPokemonsWithPagination(int pageNumber, int pageSize);
    PokemonResponseDTO add(CreatePokemonRequestDTO request);
    PokemonResponseDTO update(long id, UpdatePokemonRequestDTO request);
    PokemonResponseDTO  delete(long id);
}
