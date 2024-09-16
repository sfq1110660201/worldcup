import {
  Claimed as ClaimedEvent,
  DistributeReward as DistributeRewardEvent,
} from "../generated_/WorldCupDistributor/Contract"
import { Claimed, DistributeReward } from "../generated_/schema"

export function handleClaimed(event: ClaimedEvent): void {
  let entity = new Claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.pool = event.params.pool
  entity.user = event.params.user
  entity.amount = event.params.amount

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
