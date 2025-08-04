import React from 'react'
import InvitationCode from './InvitationCodes/InvitationCode'
import ThirdPartyNumber from './ThirdPartyNumbers/ThirdPartyNumber'
import SpamFilters from './SpamFilters/SpamFilters'

const OtherSettingsIndex = () => {
  return (
    <div className="mx-0">
      <div className="content-header-wrapper">
        <h3 className="mb-0 content-header">Other Settings</h3>
      </div>

        <div className="row">
            <div className="col-lg-6">
                <InvitationCode />
            </div>
            <div className="col-lg-6">
                <ThirdPartyNumber />
            </div>
            <div className="col-lg-6">
                <SpamFilters />
            </div>
        </div>
    </div>
  )
}

export default OtherSettingsIndex