package tr.org.obss.fp.pokedex.business.rules;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tr.org.obss.fp.pokedex.common.constants.Messages;
import tr.org.obss.fp.pokedex.common.exceptions.BusinessException;
import tr.org.obss.fp.pokedex.repository.PokemonRepository;

@AllArgsConstructor
@Service
public class PokemonBusinessRules {
    PokemonRepository repository;
    public void checkIfPokemonExistsById(long id){
        if(!repository.existsById(id)) throw new BusinessException(Messages.Pokemon.NotExists);
    }
    public void checkIfPokemonExistByName(String name){
        if(repository.existsByName(name)) throw new BusinessException(Messages.Pokemon.Exists);
    }
}