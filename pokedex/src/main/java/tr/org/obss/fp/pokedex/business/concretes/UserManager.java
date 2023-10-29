package tr.org.obss.fp.pokedex.business.concretes;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.org.obss.fp.pokedex.business.abstracts.PokemonService;
import tr.org.obss.fp.pokedex.business.abstracts.UserService;
import tr.org.obss.fp.pokedex.business.dto.requests.CreateUserRequestDTO;
import tr.org.obss.fp.pokedex.business.dto.responses.PokemonResponseDTO;
import tr.org.obss.fp.pokedex.business.dto.requests.UpdateUserRequestDTO;
import tr.org.obss.fp.pokedex.business.dto.responses.UserResponseDTO;
import tr.org.obss.fp.pokedex.business.rules.UserBusinessRules;
import tr.org.obss.fp.pokedex.common.dto.MyUserDetails;
import tr.org.obss.fp.pokedex.entities.Pokemon;
import tr.org.obss.fp.pokedex.entities.User;
import tr.org.obss.fp.pokedex.repository.RoleRepository;
import tr.org.obss.fp.pokedex.repository.UserRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserManager implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private  final ModelMapper mapper;
    private final UserBusinessRules rules;
    private final PokemonService pokemonService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserResponseDTO> getAll() {
        List<User> users = userRepository.findAll();
        List<UserResponseDTO> responses = users
                .stream()
                .map(user -> mapper.map(user, UserResponseDTO.class))
                .toList();
        return responses;
    }

    @Override
    public UserResponseDTO getById(long id) {
        rules.checkIfUserExistsById(id);
        User user = userRepository.findById(id).orElseThrow();
        UserResponseDTO response = mapper.map(user, UserResponseDTO.class);
        return response;
    }

    @Override
    public UserResponseDTO getByUsername(String username) {
        //rules.checkIfUserExistByUsername(username);
        User user = userRepository.findByUsername(username);
        UserResponseDTO response = mapper.map(user, UserResponseDTO.class);
        return response;
    }
    @Override
    public Page<UserResponseDTO> getUsersWithPagination(int pageNumber, int pageSize) {
        var pageable = PageRequest.of(pageNumber, pageSize);
        var page = userRepository.findAll(pageable);
        var result = page.map(user -> {
            UserResponseDTO responseDTO = mapper.map(user, UserResponseDTO.class);
            responseDTO.setCatchlist(user.getCatchlist().stream().map(pokemon -> mapper.map(pokemon, PokemonResponseDTO.class)).collect(Collectors.toSet()));
            responseDTO.setWishlist(user.getWishlist().stream().map(pokemon -> mapper.map(pokemon, PokemonResponseDTO.class)).collect(Collectors.toSet()));
            return responseDTO;
        }).toList();

        return new PageImpl<>(result, pageable, page.getTotalElements());
    }

    @Override
    public UserResponseDTO add(CreateUserRequestDTO request) {
        rules.checkIfUserExistByUsername(request.getUsername());
        rules.checkIfUserExistByEmail(request.getEmail());
        User user= mapper.map(request,User.class);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        var roleUserOpt = roleRepository.findByName("ROLE_USER");
        roleUserOpt.ifPresent((userRole)-> user.setRoles(Set.of(userRole)));
        User createdUser = userRepository.save(user);
        UserResponseDTO response = mapper.map(createdUser,UserResponseDTO.class);
        return response;
    }

    @Transactional
    @Override
    public UserResponseDTO update(long id, UpdateUserRequestDTO request) {
        rules.checkIfUserExistsById(id);

        User userToUpdate = userRepository.findById(id).orElseThrow();
        userToUpdate.setId(id);
        userToUpdate.setUsername(request.getUsername());
        userToUpdate.setPassword(passwordEncoder.encode(request.getPassword()));

        User updatedUser = userRepository.save(userToUpdate);
        UserResponseDTO response = mapper.map(updatedUser, UserResponseDTO.class);
        return response;
    }

    @Override
    public UserResponseDTO delete(long id) {
        rules.checkIfUserExistsById(id);
        User user = userRepository.findById(id).orElseThrow();
        user.setActive(false);
        var savedUser = userRepository.save(user);
        UserResponseDTO response = mapper.map(savedUser,UserResponseDTO.class);
        return response;
    }

    @Override
    public UserResponseDTO activate(long id) {
        rules.checkIfUserExistsById(id);
        User user = userRepository.findById(id).orElseThrow();
        user.setActive(true);
        var savedUser = userRepository.save(user);
        UserResponseDTO response = mapper.map(savedUser,UserResponseDTO.class);
        return response;
    }

    @Override
    public UserResponseDTO addPokemonToCatchList(long userId, long pokemonId) {
        rules.checkIfUserExistsById(userId);
        User user = userRepository.findById(userId).orElseThrow();
        PokemonResponseDTO pokemonResponseDTO = pokemonService.getById(pokemonId);
        user.getCatchlist().add(mapper.map(pokemonResponseDTO, Pokemon.class));
        userRepository.save(user);
        UserResponseDTO response = mapper.map(user, UserResponseDTO.class);
        return response;
    }

    @Override
    public UserResponseDTO addPokemonToWishList(long userId, long pokemonId) {
        rules.checkIfUserExistsById(userId);
        User user = userRepository.findById(userId).orElseThrow();
        PokemonResponseDTO pokemonResponseDTO = pokemonService.getById(pokemonId);
        user.getWishlist().add(mapper.map(pokemonResponseDTO, Pokemon.class));
        userRepository.save(user);
        UserResponseDTO response = mapper.map(user, UserResponseDTO.class);
        return response;
    }

    @Override
    public UserResponseDTO removePokemonFromCatchList(long userId, long pokemonId) {
        rules.checkIfUserExistsById(userId);
        User user = userRepository.findById(userId).orElseThrow();
        PokemonResponseDTO pokemonResponseDTO = pokemonService.getById(pokemonId);
        user.getCatchlist().removeIf(pokemon -> pokemon.getId() == pokemonResponseDTO.getId());
        userRepository.save(user);
        UserResponseDTO response = mapper.map(user, UserResponseDTO.class);
        return response;
    }

    @Override
    public UserResponseDTO removePokemonFromWishList(long userId, long pokemonId) {
        rules.checkIfUserExistsById(userId);
        User user = userRepository.findById(userId).orElseThrow();
        PokemonResponseDTO pokemonResponseDTO = pokemonService.getById(pokemonId);
        user.getWishlist().removeIf(pokemon -> pokemon.getId() == pokemonResponseDTO.getId());
        userRepository.save(user);
        UserResponseDTO response = mapper.map(user, UserResponseDTO.class);
        return response;
    }
    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username);
        Hibernate.initialize(user.getRoles());
        return new MyUserDetails(user);
    }
}
