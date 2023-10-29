package tr.org.obss.fp.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.org.obss.fp.pokedex.entities.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String name);
    User findByUsername(String name);
    boolean existsByEmail(String email);
}
