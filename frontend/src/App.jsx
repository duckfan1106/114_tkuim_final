import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/pokemon';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    trainerName: '',
    name: '',
    type: 'Electric',
    level: 5,
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setPokemons(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ trainerName: '', name: '', type: 'Electric', level: 5, description: '' });
      fetchPokemons();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('你確定要放生這個寶可夢嗎？')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchPokemons();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (pokemon) => {
    setEditingId(pokemon._id);
    setFormData({
      trainerName: pokemon.trainerName,
      name: pokemon.name,
      type: pokemon.type,
      level: pokemon.level,
      description: pokemon.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <header className="header-wrapper">
        <h1 className="hero-title">PikaShare</h1>
        <div className="hero-subtitle">寶可夢圖鑑登錄系統</div>
      </header>

      <main className="main-content">
        {/* Form Section */}
        <section>
          <div className="form-card">
            <h2 className="form-title">{editingId ? '編輯寶可夢' : '登錄新寶可夢'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="input-field"
                  type="text" name="trainerName" placeholder="訓練家名稱"
                  value={formData.trainerName} onChange={handleChange} required
                />
              </div>
              <div className="form-group">
                <input
                  className="input-field"
                  type="text" name="name" placeholder="寶可夢名稱 (例如：皮卡丘)"
                  value={formData.name} onChange={handleChange} required
                />
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <select className="select-field" name="type" value={formData.type} onChange={handleChange}>
                  <option value="Electric">Electric (電)</option>
                  <option value="Fire">Fire (火)</option>
                  <option value="Water">Water (水)</option>
                  <option value="Grass">Grass (草)</option>
                  <option value="Normal">Normal (一般)</option>
                  <option value="Flying">Flying (飛行)</option>
                  <option value="Bug">Bug (蟲)</option>
                  <option value="Poison">Poison (毒)</option>
                  <option value="Ground">Ground (地面)</option>
                  <option value="Rock">Rock (岩石)</option>
                  <option value="Fight">Fight (格鬥)</option>
                  <option value="Psychic">Psychic (超能)</option>
                  <option value="Ghost">Ghost (幽靈)</option>
                  <option value="Ice">Ice (冰)</option>
                  <option value="Dragon">Dragon (龍)</option>
                  <option value="Steel">Steel (鋼)</option>
                  <option value="Dark">Dark (惡)</option>
                  <option value="Fairy">Fairy (妖精)</option>
                </select>
                <input
                  className="input-field"
                  type="number" name="level" placeholder="等級" min="1" max="100"
                  value={formData.level} onChange={handleChange} required
                />
              </div>

              <div className="form-group">
                <textarea
                  className="textarea-field"
                  name="description" placeholder="描述..."
                  value={formData.description} onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {editingId ? '更新資料' : '就決定是你了！(登錄)'}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ trainerName: '', name: '', type: 'Electric', level: 5, description: '' });
                  }}
                >
                  取消
                </button>
              )}
            </form>
          </div>
        </section>

        {/* List Section */}
        <section>
          <h3>已登錄寶可夢 ({pokemons.length})</h3>

          {isLoading ? (
            <div className="loading">載入中...</div>
          ) : pokemons.length === 0 ? (
            <div className="empty-state">
              <p>目前沒有資料。成為第一位登錄的訓練家吧！</p>
            </div>
          ) : (
            <div className="donations-grid">
              {pokemons.map((pokemon) => (
                <div key={pokemon._id} className="item-card">
                  <div className="card-content">
                    <div className="item-header">
                      <div className="item-name">{pokemon.name}</div>
                    </div>
                    <div className="item-badges">
                      <span className="badge badge-cat">{pokemon.type}</span>
                      <span className="badge badge-cond">Lv. {pokemon.level}</span>
                    </div>

                    <p className="item-desc">{pokemon.description || "無描述。"}</p>

                    <div className="card-footer">
                      <span className="owner-name">訓練家：{pokemon.trainerName}</span>
                      <div>
                        <button className="action-btn btn-edit" onClick={() => handleEdit(pokemon)}>編輯</button>
                        <button className="action-btn btn-delete" onClick={() => handleDelete(pokemon._id)}>放生</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
