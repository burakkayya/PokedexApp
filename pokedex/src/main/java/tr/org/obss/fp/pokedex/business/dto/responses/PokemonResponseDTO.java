package tr.org.obss.fp.pokedex.business.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PokemonResponseDTO {
    private long id;
    private String name;
    private String type;
    private String hp;
    private String attack;
    private String defense;
    private String speed;
    private String description;
    private Date createDate;
    private Date updateDate;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private String operationType;
}
