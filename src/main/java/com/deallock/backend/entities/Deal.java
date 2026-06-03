package com.deallock.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "deals")
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    private String link;
    private String clientName;
    private String sellerPhoneNumber;

    // ----- Seller address (free text, kept as before) -----
    @Column(length = 1000)
    private String sellerAddress;

    // ----- Structured seller address fields (new) -----
    @Column(length = 100)
    private String sellerCountry;

    @Column(length = 100)
    private String sellerCity;

    @Column(length = 100)
    private String sellerLga;          // Local Government Area

    // ----- Buyer delivery address (free text, was deliveryAddress) -----
    @Column(length = 1000)
    private String deliveryAddress;    // buyer's full address

    // ----- Structured buyer address fields (new) -----
    @Column(length = 100)
    private String buyerCountry;

    @Column(length = 100)
    private String buyerCity;

    @Column(length = 100)
    private String buyerState;          // state/province for buyer

    private String itemSize;

    /**
     * Whether the user allows DealLock to list this item on the marketplace
     * (for example if the deal expires without payment).
     * <p>
     * Nullable for backward compatibility with existing rows. Treat null as "allowed".
     */
    private Boolean allowMarketplaceListing;
    private String courierPartner;
    private Integer installmentWeeks;
    private BigDecimal value;
    private BigDecimal holdingFeeAmount;
    private BigDecimal vatAmount;
    private BigDecimal logisticsFeeAmount;
    private BigDecimal upfrontPaymentAmount;
    private BigDecimal remainingBalanceAmount;
    private BigDecimal weeklyPaymentAmount;
    private BigDecimal totalAmount;
    private BigDecimal extensionServiceFeeAmount;
    @Column(length = 2000)
    private String description;
    private String status;
    private Instant createdAt;
    private Instant paymentDueAt;
    private Integer extensionWeeksUsed;
    private Instant lastPaymentReminderAt;
    private String paymentStatus;
    @Column(name = "rejection_reason", length = 2000)
    private String rejectionReason;
    private boolean secured;
    private Instant securedAt;
    private BigDecimal paymentProofAmount;
    private Instant paymentProofUploadedAt;
    private String balancePaymentStatus;
    private BigDecimal balancePaymentAmount;
    private Instant balancePaymentUploadedAt;
    private Instant deliveryInitiatedAt;
    private boolean deliveryConfirmedByUser;
    private Instant deliveryConfirmedAt;
    @Column(length = 2000)
    private String feedback;
    private Instant feedbackSubmittedAt;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] itemPhoto;
    private String itemPhotoContentType;
    @Column(length = 500)
    private String itemPhotoKey;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] itemPhoto2;
    private String itemPhoto2ContentType;
    @Column(length = 500)
    private String itemPhoto2Key;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] itemPhoto3;
    private String itemPhoto3ContentType;
    @Column(length = 500)
    private String itemPhoto3Key;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] paymentProof;
    private String paymentProofContentType;
    @Column(length = 500)
    private String paymentProofKey;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] securedItemPhoto;
    private String securedItemPhotoContentType;
    @Column(length = 500)
    private String securedItemPhotoKey;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] balancePaymentProof;
    private String balancePaymentProofContentType;
    @Column(length = 500)
    private String balancePaymentProofKey;
}
