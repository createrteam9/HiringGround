package com.hiringground.api.repository;

import com.hiringground.api.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<Transaction> findByInterviewHistoryId(Long historyId);
    Optional<Transaction> findByTransactionId(String transactionId);
}
