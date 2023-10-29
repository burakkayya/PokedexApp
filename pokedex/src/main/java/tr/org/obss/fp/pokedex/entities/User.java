package tr.org.obss.fp.pokedex.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "USER_ACCOUNT")
public class User extends EntityBase{
    @Column(name = "USERNAME", length = 255, nullable = false, unique = true)
    private String username;

    @Column(name = "EMAIL", length = 255, nullable = false, unique = true)
    private String email;

    @Column(name = "PASSWORD", length = 255, nullable = false)
    private String password;
    @ManyToMany
    @JoinTable(
            name = "USER_ROLE", joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
    private Set<Role> roles;
    @ManyToMany
    @JoinTable(
            name = "USER_CATCHLIST",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "POKEMON_ID"))
    private Set<Pokemon> catchlist;

    @ManyToMany
    @JoinTable(
            name = "USER_WISHLIST",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "POKEMON_ID"))
    private Set<Pokemon> wishlist;
}
