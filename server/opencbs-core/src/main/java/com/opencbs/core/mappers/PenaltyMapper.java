package com.opencbs.core.mappers;

import com.opencbs.core.accounting.services.AccountService;
import com.opencbs.core.annotations.Mapper;
import com.opencbs.core.domain.Penalty;
import com.opencbs.core.dto.penalty.PenaltyCreateDto;
import com.opencbs.core.dto.penalty.PenaltyInfoDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

@RequiredArgsConstructor
@Mapper
public class PenaltyMapper {

    private static final String ACCOUNT_NOT_FOUND_MSG = "Not found account by [ID]=%s";

    private final AccountService accountService;


    public PenaltyInfoDto mapToDto(Penalty penalty) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        return modelMapper.map(penalty, PenaltyInfoDto.class);
    }

    public Penalty mapToEntity(PenaltyCreateDto penaltyDto){
        ModelMapper modelMapper = new ModelMapper();
        Penalty penalty = modelMapper.map(penaltyDto, Penalty.class);
        penalty.setAccrualAccount(this.accountService.getOne(penaltyDto.getAccrualAccountId())
                .orElseThrow(() -> new IllegalArgumentException(String.format(ACCOUNT_NOT_FOUND_MSG, penaltyDto.getAccrualAccountId()))));
        penalty.setIncomeAccount(this.accountService.getOne(penaltyDto.getIncomeAccountId())
                .orElseThrow(() -> new IllegalArgumentException(String.format(ACCOUNT_NOT_FOUND_MSG, penaltyDto.getIncomeAccountId()))));
        penalty.setWriteOffAccount(this.accountService.getOne(penaltyDto.getWriteOffAccountId())
                .orElseThrow(() -> new IllegalArgumentException(String.format(ACCOUNT_NOT_FOUND_MSG, penaltyDto.getWriteOffAccountId()))));

        return penalty;
    }
}
