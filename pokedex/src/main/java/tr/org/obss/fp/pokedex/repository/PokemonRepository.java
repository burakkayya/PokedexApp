package tr.org.obss.fp.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.org.obss.fp.pokedex.entities.Pokemon;

import java.util.Set;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {
    boolean existsByName(String name);
    Pokemon findByName(String name);
}
