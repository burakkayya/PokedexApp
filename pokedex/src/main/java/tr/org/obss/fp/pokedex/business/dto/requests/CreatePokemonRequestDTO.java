package tr.org.obss.fp.pokedex.business.dto.requests;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePokemonRequestDTO {
    @Length(min = 2, message = "lenght must be greater than 2")
    @NotBlank(message = "Name cannot be empty")
    private String name;

    @Length(min = 2, message = "lenght must be greater than 2")
    @NotBlank(message = "Type cannot be empty")
    private String type;

    @Min(value = 0, message = "HP must be greater than 0")
    @Pattern(regexp = "\\d+", message = "HP must be a numeric value")
    private String hp;

    @Min(value = 0, message = "Attack must be greater than 0")
    @Pattern(regexp = "\\d+", message = "Attack must be a numeric value")
    private String attack;

    @Min(value = 0, message = "Defense must be greater than 0")
    @Pattern(regexp = "\\d+", message = "Defense must be a numeric value")
    private String defense;

    @Min(value = 0, message = "Speed must be greater than 0")
    @Pattern(regexp = "\\d+", message = "Speed must be a numeric value")
    private String speed;

    @Length(min = 10, message = "lenght must be greater than 10")
    @NotBlank(message = "Description cannot be empty")
    private String description;
}
