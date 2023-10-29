package tr.org.obss.fp.pokedex.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import tr.org.obss.fp.pokedex.entities.Role;
import tr.org.obss.fp.pokedex.repository.RoleRepository;

public class DataLoader implements ApplicationRunner {
    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    private final RoleRepository roleRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(DataLoader.class);

    public DataLoader(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        LOGGER.info("DataLoader is started");
        var userRoleExists = roleRepository.existsByName(ROLE_USER);
        if(!userRoleExists){
            var userRole = new Role();
            userRole.setName(ROLE_USER);
            roleRepository.save(userRole);
        }
        var adminRoleExists = roleRepository.existsByName(ROLE_ADMIN);
        if(!adminRoleExists){
            var adminRole = new Role();
            adminRole.setName(ROLE_ADMIN);
            roleRepository.save(adminRole);
        }

    }
}
