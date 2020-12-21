import React from 'react'
import { Col, Card } from 'react-bootstrap'

const borderStyle = {
  cursor: 'pointer',
  borderBottom: 'solid #868686 4px',
  borderTop: 'groove #868686 1px',
  borderLeft: 'groove #868686 1px',
  borderRight: 'groove #868686 1px',
  boxShadow: '0 0 7px rgba(10, 10, 10, 0.3)',
}

const LeadList = (props) => {
  const { ad } = props
  return (
    <Col xs={6} sm={4} lg={2} style={{ paddingBottom: 5, paddingTop: 5 }}>
      <Card onClick={() => handleClick(ad._id)} className="h-100 rounded-top" style={borderStyle}>
        <Card.Img
          src={'https://api.makinatr.com' + ad.cover.url.thumb}
          style={{
            objectFit: 'cover',
            maxWidth: 260,
            maxHeight: 260,
          }}
          alt="makina image"
          className="mx-auto rounded-0"
        />
        <Card.Body className="p-1">
          <Card.Title className="h6 mb-0 text-capitalize text-truncate">{ad.title}</Card.Title>
          <Card.Text className="mb-0">
            <small className="text-capitalize text-truncate text-muted">
              {ad.brand && ad.brand.name}
            </small>
          </Card.Text>
          <Card.Text>
            {ad.addressGoogle && (
              <>
                <small className="text-capitalize text-truncate text-muted align-middle">
                  {ad.addressGoogle &&
                    ad.addressGoogle.split(',')[ad.addressGoogle.split(',').length - 1].trim()}
                </small>
              </>
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="p-1">
          <span className="float-right text-muted text-lowercase align-middle">
            <small>
              {'@'}
              {(ad.user.google && ad.user.google.displayName) || ad.user.local.email.split('@')[0]}
            </small>
          </span>
        </Card.Footer>
      </Card>
    </Col>
  )
}

export default LeadList
