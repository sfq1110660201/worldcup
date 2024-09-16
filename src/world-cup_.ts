import {
  ClaimReward as ClaimRewardEvent,
  Finialize as FinializeEvent,
  Play as PlayEvent
} from "../generated_/WorldCup/WorldCup"
import {
  Claimed as ClaimedEvent,
  DistributeReward as DistributeRewardEvent,
} from "../generated_/WorldCupDistributor/Contract"

import { ClaimReward, Finialize, Play } from "../generated_/schema"
import { Claimed, DistributeReward } from "../generated_/schema"

export function handleClaimReward(event: ClaimRewardEvent): void {
  let entity = new ClaimReward(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._claimer = event.params._claimer
  entity._amt = event.params._amt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFinialize(event: FinializeEvent): void {
  let entity = new Finialize(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._currRound = event.params._currRound
  entity._country = event.params._country

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlay(event: PlayEvent): void {
  let entity = new Play(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._currRound = event.params._currRound
  entity._player = event.params._player
  entity._country = event.params._country

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDistributeReward(event: DistributeRewardEvent): void {
  let entity = new DistributeReward(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.merkleRoot = event.params.merkleRoot
  entity.index = event.params.index
  entity.amount = event.params.amount
  entity.settleBlockNumber = event.params.settleBlockNumber

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
