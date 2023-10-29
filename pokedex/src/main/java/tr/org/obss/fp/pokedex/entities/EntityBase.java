package tr.org.obss.fp.pokedex.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class EntityBase {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @CreatedDate
    @Column(name = "CREATE_DATE")
    private Date createDate;
    @LastModifiedDate
    @Column(name = "UPDATE_DATE")
    private Date updateDate;
    @CreatedBy
    @Column(name = "CREATED_BY")
    private String createdBy;
    @LastModifiedBy
    @Column(name = "UPDATED_BY")
    private String updatedBy;
    @Column(name = "ACTIVE")
    private Boolean active;
    @Column(name = "OPERATION_TYPE")
    private String operationType;
    @PrePersist
    public void onPrePersist() {
        this.createDate = new Date();
        this.updateDate = new Date();
        this.active = true;
        this.operationType = "INSERT";
    }
    @PreUpdate
    public void onPreUpdate() {
        this.updateDate = new Date();
        this.operationType = "UPDATE";
    }
    @PreRemove
    public void onPreRemove() {
        this.updateDate = new Date();
        this.active = false;
        this.operationType = "DELETE";
    }
}
