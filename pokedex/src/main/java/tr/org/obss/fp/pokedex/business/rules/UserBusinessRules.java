package tr.org.obss.fp.pokedex.business.rules;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tr.org.obss.fp.pokedex.common.constants.Messages;
import tr.org.obss.fp.pokedex.common.exceptions.BusinessException;
import tr.org.obss.fp.pokedex.repository.UserRepository;
@AllArgsConstructor
@Service
public class UserBusinessRules {
    UserRepository repository;
    public void checkIfUserExistsById(long id){
        if(!repository.existsById(id)) throw new BusinessException(Messages.User.NotExists);
    }
    public void checkIfUserExistByUsername(String name){
        if(repository.existsByUsername(name)) throw new BusinessException(Messages.User.Exists);
    }
    public void checkIfUserExistByEmail(String email){
        if(repository.existsByEmail(email)) throw new BusinessException(Messages.User.Exists);
    }
}