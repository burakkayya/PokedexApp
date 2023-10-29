package tr.org.obss.fp.pokedex.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
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
@Table(name = "POKEMON")
public class Pokemon extends EntityBase{
    @Column(name = "NAME", length = 100, unique = true, nullable = false)
    private String name;
    @Column(name = "TYPE", length = 100, nullable = false)
    private String type;
    @Column(name = "HP", length = 100, nullable = false)
    private String hp;
    @Column(name = "ATTACK", length = 100, nullable = false)
    private String attack;
    @Column(name = "DEFENSE", length = 100, nullable = false)
    private String defense;
    @Column(name = "SPEED", length = 100, nullable = false)
    private String speed;
    @Column(name = "DESCRIPTION", length = 100, nullable = false)
    private String description;

    @ManyToMany(mappedBy = "wishlist")
    private Set<User> usersWithInWishlist;

    @ManyToMany(mappedBy = "catchlist")
    private Set<User> usersWithInCatchlist;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pokemon otherPokemon = (Pokemon) o;
        return this.getId() == otherPokemon.getId();
    }
}
