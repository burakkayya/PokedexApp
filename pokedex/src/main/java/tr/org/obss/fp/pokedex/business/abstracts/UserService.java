package tr.org.obss.fp.pokedex.business.abstracts;

import org.springframework.data.domain.Page;
import tr.org.obss.fp.pokedex.business.dto.requests.CreateUserRequestDTO;
import tr.org.obss.fp.pokedex.business.dto.requests.UpdateUserRequestDTO;
import tr.org.obss.fp.pokedex.business.dto.responses.UserResponseDTO;

import java.util.List;

public interface UserService {
    List<UserResponseDTO> getAll();
    UserResponseDTO getById(long id);
    UserResponseDTO getByUsername(String username);
    public Page<UserResponseDTO> getUsersWithPagination(int pageNumber, int pageSize);
    UserResponseDTO add(CreateUserRequestDTO request);
    UserResponseDTO update(long id, UpdateUserRequestDTO request);
    UserResponseDTO  delete(long id);
    UserResponseDTO activate(long id);
    UserResponseDTO addPokemonToCatchList(long userId, long pokemonId);
    UserResponseDTO addPokemonToWishList(long userId, long pokemonId);
    UserResponseDTO removePokemonFromCatchList(long userId, long pokemonId);
    UserResponseDTO removePokemonFromWishList(long userId, long pokemonId);
}
