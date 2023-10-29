package tr.org.obss.fp.pokedex.business.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private long id;
    private String username;
    private String email;
    private Set<PokemonResponseDTO> catchlist;
    private Set<PokemonResponseDTO> wishlist;
    private Set<String> roles;
    private Date createDate;
    private Date updateDate;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private String operationType;
}
