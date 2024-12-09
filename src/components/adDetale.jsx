import React from 'react';

const AdDetails = ({ selectedAd, closeAd }) => {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '45vh' }}>
                <div className="card-details d-flex flex-wrap align-items-center border p-2" style={{ width: '90%', maxWidth: '1200px', height: 'auto' }}>
                    <div className="image-container" style={{ width: '100%', maxWidth: '600px' }}>
                        <img
                            src={`https://pets.сделай.site${selectedAd.photos}`}  // Assuming `photos` contains relative URL
                            alt={`рисунок ${selectedAd.kind}`}
                            style={{
                                height: 'auto',
                                width: '100%',
                                objectFit: 'contain',  // Updated to 'contain' to prevent cropping
                                maxHeight: '400px',
                            }}
                            className="animal-image"
                        />
                    </div>
                    <div className="text-container ms-4 mt-4 mt-md-0" style={{ flex: '1 1 auto' }}>
                        <h5>{selectedAd.kind}</h5>
                        <p><strong>ID:</strong> {selectedAd.id}</p>
                        <p><strong>Имя:</strong> {selectedAd.name}</p>
                        <p><strong>Телефон:</strong> {selectedAd.phone}</p>
                        <p><strong>Описание:</strong> {selectedAd.description}</p>
                        <p><strong>Номер чипа:</strong> {selectedAd.mark}</p>
                        <p><strong>Район:</strong> {selectedAd.district}</p>
                        <p><strong>Дата:</strong> {selectedAd.date}</p>
                        <button className="btn btn-primary" onClick={closeAd}>Назад к списку</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdDetails;
